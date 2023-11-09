import { getMask, getName } from "$lib/algo/data";
import { order } from '$lib/algo/sort';
import { getAuthor } from "$lib/algo/user";
import { pb, getId } from '$lib';
import { fail } from "$lib/data/popup";

export const dict = {
    category: [
        'Алгоритмы',
        'На смекалку',
        'Шахматы',
        'Геометрия',
        'Детям'
    ],
    progress: [
        'Не решал',
        'Сохранено',
        'Отправлено',
        'На проверке',
        'Не верно',
        'Зачтено'
    ],
    status: [
        'Отбор',
        'Архив',
        'Дубли',
        'Топка',
        'Выбор'
    ],
    sort: {
        '-likes': 'Интересные',
        '-created': 'Новые',
        'created': 'Старые'
    },
    weight: [0, 1, 2, 3, 4, 5]
}

// counts

function updateLikes(res, problem) {
    for (let k of ['like', 'dislike']) {
        problem[k] = res[k];
        problem['_' + k] = res['_' + k];
    }
    problem.likes = getLikes(problem);
}

function updateSteps(res, problem) {
    for (let i = 1; i < 5; i++) {
        const k = 'step' + i;
        problem[k] = res[k];
        problem['_' + k] = res['_' + k];
    }
    problem.steps = getSteps(problem);
}

// solutions

async function loadSolutions(me) {
    const solutions = {};
    const res = await pb.collection('solutions').getFullList({
        filter: `author="${me.id}"`
    });
    for (const s of res) {
        solutions[s.problem] = {
            progress: s.progress,
            like: s.like
        };
    }
    return solutions;
}

async function loadSolution(me, problem) {
    let solution;

    const id = getId(me, problem.id);
    try {
        solution = await pb.collection('solutions').getOne(id);
    } catch (err) {
        console.log(err);
        solution = { id, answer: '', proof: '', like: 0, author: me.id };
    }
    return solution;
}

// likes

async function getLike(problem, like, me) {
    let s = problem.solution;
    if (!s.id) s.id = getId(me, problem.id);

    let solution = { like: s.like === like ? 0 : like };

    like = 0;
    while (s.like !== solution.like) {
        like += solution.like - s.like;
        try {
            s = problem.solution = await pb.collection('solutions').update(s.id, {
                'like+': solution.like - s.like
            });
        } catch (err) {
            s = problem.solution = await pb.collection('solutions').create({
                id: s.id,
                like: solution.like,
                problem: problem.id,
                author: me.id,
                progress: 0
            });
            pb.collection('users').update(me.id, { 'solutions+': 1 });
        }
    }
    return like;
}

export async function likeProblem(problem, like, me) {
    like = await getLike(problem, like, me);
    if (like === 0) return;

    const s = problem.solution;
    const data = {};

    if (like > 0 && s.like > 0) data['like+'] = 1;
    if (like < 0 && s.like < 0) data['dislike+'] = 1;
    if (like < 0 && s.like > like) data['like-'] = 1;
    if (like > 0 && s.like < like) data['dislike-'] = 1;
    if (s.ok) for (const k of Object.keys(data)) data['_' + k] = 1;

    const res = await pb.collection('problems').update(problem.id, data);
    updateLikes(res, problem);
};

function getLikes(problem) {
    const like = problem._like + problem.like / 5;
    const dislike = problem._dislike + problem.dislike / 5;

    if (like + dislike < 5) {
        return null;
    }
    const likes = like / (like + dislike);
    return Math.floor(100 * likes);
}

// steps

function getSteps(problem) {
    const p1 = problem._step1 / (problem.step1 + 1);
    const p2 = problem._step2 / (problem.step2 + 1);
    const p3 = problem._step3 / (problem.step3 + 1);
    const p4 = problem._step4 / (problem.step4 + 1);

    if (p1 + p2 + p3 + p4 === 0) {
        return null;
    }
    const steps = p1 + (1 - p1) * (p2 * 2 + (1 - p2) * (p3 * 3 + (1 - p3) * (p4 * 4 + (1 - p4) * 5)));
    return steps.toFixed(1);
}

export async function stepSolution(problem, step) {
}

// problems

export async function loadProblems(params, solutions) {
    let { author, status, sort } = params;
    if (sort == '-likes') sort = null;

    let filter;
    if (status) filter = `status=${status}`;
    if (author) filter = `author="${author}"`;

    const problems = await pb.collection('problems').getFullList({ filter, sort, expand: 'author' });

    problems.map(p => {
        p.author = getAuthor(p.expand.author);
        delete p.expand;

        if (solutions) {
            p.solution = solutions[p.id] || { progress: 0, like: 0 };
            p.progress = 1 << p.solution.progress;
        }
        p.likes = getLikes(p);
        p.steps = getSteps(p);
        p.solved = p.answer !== '' || p.answer !== '';

        p.category = getMask(p.categories, dict.category);
    });
    return { problems, sort };
}

export async function getProblems(data, params, me) {
    const { author, status, sort } = params;
    const key = '_' + (author || status);

    if (me && !data.solutions) data.solutions = await loadSolutions(me);
    if (!data[key]) data[key] = await loadProblems(params, data.solutions);

    if (data[key].sort !== sort) {
        order(data[key].problems, sort);
        data[key].sort = sort;
    }
    const category = getMask(params.categories, dict.category);
    const progress = getMask(params.progresses, dict.progress);
    const search = params.search.toLowerCase();

    return {
        problems: data[key].problems.filter(p =>
            (progress == 0 || p.progress & progress) &&
            (category == 0 || p.category & category) &&
            (params.weight == null || p.weight == params.weight) &&
            (search === '' || p.text.toLowerCase().includes(search))
        ),
        params: { ...params }
    };
}

export function getTitle(params) {
    const names = [];
    if (params.weight != null) names.push(params.weight);

    if (params.categories.length > 0) names.push(getName(params.categories, dict.category));
    if (params.progresses.length > 0) names.push(getName(params.progresses, dict.progress));

    if (params.status != null) names.push(dict.status[params.status]);
    if (params.author != null) names.push('Автор');

    names.push(dict.sort[params.sort]);
    return names.join(' – ');
}

export function getSubtitle(problem, params) {
    const names = [];

    if (params?.weight == null) names.push(problem.weight);

    names.push(getName(problem.categories, dict.category));
    if (params && params.progresses && params.progresses.length !== 1) {
        if (problem.solution && problem.solution.progress !== 0) {
            names.push(dict.progress[problem.solution.progress]);
        }
    }
    if (problem.likes) names.push(problem.likes);

    return names.join(' – ');
}

// problem

export async function loadProblem(id, me) {
    try {
        const problem = await pb.collection('problems').getOne(id, { expand: 'author' });
        await expandProblem(me, problem);
        return problem;

    } catch (err) {
        fail.set('Нет такой задачи!')
        console.log(err.message);
    }
}

export async function expandProblem(me, problem) {
    problem.author = getAuthor(problem.expand.author);
    delete problem.expand;

    problem.likes = getLikes(problem);
    problem.steps = getSteps(problem);

    if (me) {
        problem.solution = await loadSolution(me, problem);
    }
}

export async function getProblem(data, id, me) {
    if (!data[id]) data[id] = await loadProblem(id, me);
    return data[id];
}

const keys = ['title', 'categories', 'condition', 'notes', 'answer', 'proof'];

export async function loadDraft(me, problem) {
    let draft = {};

    const id = getId(me, problem.id);
    try {
        draft = await pb.collection('drafts').getOne(id);
        for (const key of keys) {
            if (!draft[key]) draft[key] = problem[key];
        }
    } catch (err) {
        draft.editor = me.id;
        for (const key of keys) draft[key] = problem[key];
    }
    return draft;
}

export async function updateProblem(problem, draft) {
    if (draft.editor !== problem.author) draft['editors+'] = draft.editor;
    await pb.collection('problems').update(problem.id, draft);
    for (const key of keys) problem[key] = draft[key];
}

export async function updateDraft(problem, update) {
    if (update.id) {
        await pb.collection('drafts').update(update.id, update);
    } else {
        update.id = getId(me, problem.id);
        try {
            await pb.collection('drafts').create({
                problem: problem.id, ...update
            });
        } catch (err) {
            await pb.collection('drafts').update(update.id, update);
        }
    }
}

// access

export function canShowSolution(me, problem) {
    return me && (problem.solution.ok || me.access > 5);
}

export function canEditStatus(me, problem) {
    if (!me || me.access < 4) {
        return false;
    }
    if (me.access >= 6 || problem.status < 3) {
        return true;
    }
    if (problem.status === 3) {
        if (me.access === 4) {
            return problem.like > 2 * problem.dislike;
        }
        if (me.access === 5) {
            return problem.like > problem.dislikes;
        }
    }
    if (problem.status === 4) {
        if (me.access === 4) {
            return 2 * problem.like < problem.dislike;
        }
        if (me.access === 5) {
            return problem.like < problem.dislike;
        }
    }
    return false;
}

export function canShowStatus(me) {
    return me && me.access >= 3;
}

export function canEditProblem(me, problem) {
    if (!me) {
        return false;
    }
    if (problem.solution.ok || !problem.solved) {
        return me.access > 3 || problem.author.id === me.id;
    }
    return me.access >= 6;
}

export function canUpdateProblem(me, problem) {
    if (problem.status === 0) {
        return me.id === problem.author || me.access >= 5;
    }
    if (problem.status < 3) {
        return me.id === problem.author || me.access >= 4;
    }
    return me.access >= 6;
}


export function isLiked(problem) {
    return problem.likes - problem.dislike > 3 && problem.likes > 70;
}

export function canLikeProblem(me) {
    return me && me.access > 0;
}


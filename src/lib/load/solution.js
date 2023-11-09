import { getMask, getName } from "$lib/algo/data";
import { order } from '$lib/algo/sort';
import { getAuthor } from "$lib/algo/user";
import { pb } from '$lib';

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
        '-updated': 'Новые',
        'updated': 'Старые'
    },
    weight: [0, 1, 2, 3, 4, 5]
}

// solutions

export async function loadProblems(me) {
    const res = await pb.collection('solutions').getFullList({
        filter: `author="${me.id}"`, // ok
        expand: 'problem'
    });
    const problems = {};
    for (const s of res) {
        const p = s.expand.problem;

        problems[s.problem] = {
            title: p.title,
            weight: p.weight,
            categories: p.categories,
            category: getMask(p.categories, dict.category),
            status: p.status
        };
    }
    return problems;
}

export async function loadSolutions(params, problems) {
    const { sort, progress, author } = params;
    let filter;

    if (progress) filter = `progress=${progress}`;
    if (author) filter = `author="${author}"`;

    let solutions = [];

    const res = await pb.collection('solutions').getFullList({ filter, sort, expand: 'author' });
    for (const s of res) {
        const p = problems[s.problem];
        if (p) {
            solutions.push({
                id: s.id,
                answer: s.answer,
                proof: s.proof,
                progress: s.progress,
                ok: s.ok,
                author: getAuthor(s.expand.author),
                updated: s.updated,
                ...p
            });
        }
    }
    return { solutions, sort };
}

export async function getSolutions(data, params, me) {
    const { author, progress, sort } = params;
    const key = '_' + (author || progress);

    if (!me) return null;
    if (!data.problems) data.problems = await loadProblems(me);

    if (!data[key]) data[key] = await loadSolutions(params, data.problems);

    if (data[key].sort !== sort) {
        order(data[key].solutions, sort);
        data[key].sort = sort;
    }
    const category = getMask(params.categories, dict.category);

    return {
        solutions: data[key].solutions.filter(p =>
            (params.progress == null || p.progress == params.progress) &&
            (params.status == null || p.status == params.status) &&
            (category == 0 || p.category & category) &&
            (params.weight == null || p.weight == params.weight)
        ),
        params: { ...params }
    };
}

export async function updateSolution(solution, params, me) {
    if (solution.progress === 2) {
        solution.prev = { answer: solution.answer, proof: solution.proof };

        solution.answer = params.answer;
        solution.proof = params.proof;
    }
    solution.next = { ...params };

    if (solution.created) {
        await pb.collection('solutions').update(solution.id, solution);
    } else {
        let res;
        try {
            res = await pb.collection('solutions').create(solution);
            pb.collection('users').update(me.id, { 'solutions+': 1 });
        } catch (err) {
            console.log(err.message);
            res = await pb.collection('solutions').update(solution.id, solution);
        }
        solution.created = res.created;
    }
}

export function getTitle(params) {
    const names = [];
    if (params.weight != null) names.push(params.weight);

    const categories = getName(params.categories, dict.category);
    if (categories !== '') names.push(categories);

    if (params.progress != null) names.push(dict.progress[params.progress]);
    if (params.status != null) names.push(dict.status[params.status]);

    if (params.author != null) names.push('Автор');
    names.push(dict.sort[params.sort]);

    return names.join(' – ');
}

export function getSubtitle(problem, params) {
    const names = [];
    if (params?.weight == null) names.push(problem.weight);

    names.push(getName(problem.categories, dict.category));
    if (params?.status == null && problem.status != 4) names.push(dict.status[problem.status]);

    if (params && params.progress == null) names.push(dict.progress[problem.progress]);
    return names.join(' – ');
}

// solution

export async function loadSolution(id) {
    const solution = await pb.collection('solutions').getOne(id, { expand: 'author,problem' });

    const p = solution.problem = solution.expand.problem;
    delete p.author;
    p.solved = p.answer !== '' || p.proof !== '';

    solution.author = solution.expand.author;
    delete solution.expand;

    return solution;
}

export async function getSolution(data, id) {
    if (!data[id]) data[id] = await loadSolution(id);
    return data[id];
}

export async function setProgress(solution, progress) {
    await pb.collection('solutions').update(solution.id, { progress });
    solution.progress = progress;
}

// access

export function canEditProgress(me, solution) {
    return me.access >= 6 || solution.ok;
}

export function canShowSolutions(me, author) {
    return me && (me.id === author || me.access >= 3);
}
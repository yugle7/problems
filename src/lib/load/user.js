import { pb, getId } from '$lib';
import { order } from '$lib/algo/sort';

export const dict = {
    role: [
        'Новичок',
        'Забанен',
        'Участник',
        'Спонсор',
        'Модератор',
        'Админ',
        'Создатель'
    ],
    sort: {
        'position': 'Лучшие',
        '-updated': 'Активные',
        '-created': 'Новые',
        'created': 'Старые'
    },
    provider: [
        'email/password',
        'google',
        'yandex'
    ]
};

async function loadFriends(me) {
    if (!me) return [];
    const filter = `me="${me.id}"`;
    const res = await pb.collection('friends').getFullList({ filter });
    return res.map(f => f.to);
}
// users

const limit = 32;

async function loadUsers(params, friends) {
    const { role, author } = params;

    let filter;
    let sort;

    let users;

    if (author) {
        filter = `me="${author}"`;

        const res = await pb.collection('friends').getFullList({ filter, expand: 'to' });
        users = res.map(f => f.expand.to);
    } else {
        filter = role == null ? "position>0" : `role=${role}`;
        sort = '-updated';

        users = await pb.collection('users').getFullList(limit, { sort, filter });
    }
    if (friends.length > 0) users.map(u => u.friend = friends.includes(u.id));
    return { users, sort };
}

export async function getUsers(data, params, me) {
    const { role, author, sort } = params;
    const key = '_' + (author || role);

    if (!data.friends) data.friends = await loadFriends(me);
    if (!data[key]) data[key] = await loadUsers(params, data.friends);

    if (data[key].sort !== sort) {
        order(data[key].users, sort);
        data[key].sort = sort;
    }
    return { users: data[key].users, params: { ...params } };
}

export function getTitle(params) {
    const names = [dict.sort[params.sort]];
    if (params.friend) names.push('Друзья');
    if (params.role != null) names.push(dict.role[params.role]);
    return Object.values(names).join(' – ');
}

export function getSubtitle(user, params) {
    const names = [];
    if (params.role == null) names.push(dict.role[user.role]);
    if (user.friend) names.push('Друг');
    return names.join(' – ');
}

// user

export async function loadUser(id, me, friends) {
    if (me && me.id === id) {
        me.me = true;
        return me;
    }
    const user = await pb.collection('users').getOne(id);
    if (friends?.length > 0) user.friend = friends.includes(id);

    return user;
}

export async function getUser(data, id, me) {
    if (!data.friends) data.friends = await loadFriends(me);
    if (!data[id]) data[id] = await loadUser(id, me, data.friends);
    return data[id];
}

export async function triggerFriend(me, user) {
    const id = getId(me, user.id);

    if (user.friend) {
        try {
            await pb.collection('friends').delete(id);
            await pb.collection('users').update(me.id, { 'friends-': 1 });
            user.friend = false;
        } catch (err) {
            console.log(err.message);
        }
    } else {
        try {
            await pb.collection('friends').create({ id, me: me.id, to: user.id });
            await pb.collection('users').update(me.id, { 'friends+': 1 });
            user.friend = true;
        } catch (err) {
            console.log(err.message);
        }
    }
}

export function triggerEmailVisibility(me) {
    return async () => {
        const emailVisibility = !me.emailVisibility;
        await pb.collection('users').update(me.id, { emailVisibility });
        me.emailVisibility = emailVisibility;
    }
}

export function canAddProblem(me) {
    return me && me.access > 0;
}
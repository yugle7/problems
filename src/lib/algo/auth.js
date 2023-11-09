import { pb } from "$lib";
import { dict } from "$lib/load/user";

export function checkPassword(password) {
    if (password !== '' && password.length < 8) {
        return 'должно быть не меньше 8 символов';
    }
    return null;
}

export function checkEmail(email) {
    if (email === '') {
        return null;
    }
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return '';
    }
    return 'некорректная почта';
}

async function getUsername() {
    const res = await pb.collection('username').getOne(0);
    return res.which + res.who;
}

async function updateUsername(user) {
    for (let i = 0; i < 8; i++) {
        try {
            await pb.collection('users').update(user.id, {
                username: await getUsername()
            });
            break;
        } catch (err) {
            console.log(err);
        }
    }
}

export async function authWithProvider(id) {
    const res = await pb.collection('users').authWithOAuth2({ provider: dict.provider[id] });

    if (res.meta.isNew) {
        await pb.collection('users').update(res.record.id, {
            fullname: res.meta.name,
            provider: id
        });
        updateUsername(res.record);
    }
    return res;
}

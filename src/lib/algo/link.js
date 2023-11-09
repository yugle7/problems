export const links = {
    vk: 'vk.com',
    fb: 'fb.com',
    ok: 'ok.ru',
    gh: 'github.com',
    gl: 'gitlab.com',
    tg: 'telegram.com',
    x: 'x.com',
    pt: 'pinterest.com',
    yt: 'youtube.com',
    in: 'linkedin.com'
};

export function getView(owner, login) {
    return `${links[owner]}/${login}`;
}

export function getLink(owner, login) {
    return `https://${links[owner]}/${login}`;
}

const owners = {
    'vkontakte': 'vk',
    'facebook': 'fb',
    'telegram': 'tg',
    'github': 'gh',
    'gitlab': 'gl',
    't': 'tg',
    'twitter': 'x',
    'tw': 'x',
    'linkedin': 'in',
    'pinterest': 'pt',
    'youtube': 'yt',
}

function getOwner(domain) {
    return owners[domain] ?? domain;
}

export function checkLogin(login, domain, owner) {
    if (!login) {
        return 'не удалось определить логин';
    }
    if (/^[^a-z0-9_\-\.]+$/.test(login)) {
        return `некорректный логин ${login}`;
    }
    if (!domain) {
        return null;
    }
    if (getOwner(domain) === owner) {
        return null;
    }
    return `некорректный хост ${domain}`
}

export function parseLogin(login) {
    const res = login.toLowerCase().match(/^((https?:\/\/)?(www.)?([a-z]+)\.[a-z]+\/|@|\/)?([^\/@]+)/)
    return { login: res[5], domain: res[4] };
}

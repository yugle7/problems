export function checkUsername(username) {
    if (username === '') {
        return null;
    }
    if (username.length < 3) {
        return 'должно быть более 2 символов';
    }
    if (username.length > 15) {
        return 'должно быть не более 15 символов';
    }
    if (/[A-Z]/.test(username)) {
        return 'не должно быть заглавных букв'
    }
    if (/[^a-z0-9_]/.test(username)) {
        return 'разрешена только латиница, цифры и _'
    }
    return null;
}

export function checkFullname(fullname) {
    if (fullname.length < 1) {
        return 'должно быть более 1 символа';
    }
    if (fullname.length > 25) {
        return 'должно быть не более 25 символов';
    }
    if (/[0-9]$/.test(fullname)) {
        return 'не должно быть цифр'
    }
    if (/[^a-zA-Zа-яА-ЯёЁ '-]/.test(fullname)) {
        return 'недопустимый символ'
    }
    return null;
}

export function normFullname(fullname) {
    fullname = fullname.toLowerCase();
    fullname = fullname.replace('ё', 'е');
    let names = fullname.split(/[^a-zа-я]/);
    names = names.filter(name => name !== '');
    names = names.map(name => name[0].toUpperCase() + name.slice(1));
    return names.join(' ');
}

export function plural(k, names) {
    const d = Math.floor(k / 10);
    const m = k % 10;
    let i = 2;
    if (m === 1) {
        i = 0;
    } else if (d != 1 && 1 < m && m < 5) {
        i = 1;
    }
    return `${k} ${names[i]}`;
}
export function getColor(user) {
    if (user.position === 0) {
        return '7';
    }
    if (user.position <= 10) {
        return 'green';
    }
    if (user.position <= 100) {
        return 'blue';
    }
    if (user.position <= 1000) {
        return 'red';
    }
    return '5';
}

export function getStyle(user) {
    return `color: var(--color-${getColor(user)})`;
}

export function getAuthor(user) {
    return {
        id: user.id,
        username: user.username,
        position: user.position
    };
}

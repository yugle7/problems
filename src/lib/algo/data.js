export function getMask(keys, names) {
    let mask = 0;

    if (keys && 0 < keys.length && keys.length < names.length) {
        for (const k of keys) {
            mask |= 1 << k;
        }
    }
    return mask;
}

export function getName(keys, names) {
    let name = '';

    if (keys && 0 < keys.length && keys.length < names.length) {
        for (const k of keys) {
            if (name === '') {
                name = names[k];
            } else {
                name += ', ' + names[k];
            }
        }
    }
    return name;
}
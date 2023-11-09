export function compare(sort) {
    if (sort.startsWith('-')) {
        sort = sort.substring(1);
        return (a, b) => (a[sort] < b[sort]) - (a[sort] > b[sort]);
    }
    return (a, b) => (a[sort] > b[sort]) - (a[sort] < b[sort]);
}

export function order(values, sort) {
    values.sort(compare(sort));
}
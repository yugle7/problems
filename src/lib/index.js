import PocketBase from 'pocketbase'
import { writable } from "svelte/store";

export const pb = new PocketBase("http://127.0.0.1:8090");

export const profile = writable(pb.authStore.model);

pb.authStore.onChange((auth) => {
    profile.set(pb.authStore.model);
});

export function logout() {
    pb.authStore.clear();
}

function getCode(s, i) {
    const n = s.charCodeAt(i);
    return n < 58 ? n - 48 : n - 87;
}
function getChar(n) {
    if (n >= 36) {
        n -= 36;
    }
    return String.fromCharCode(n < 10 ? n + 48 : n + 87);
}
export function getId(rec, id) {
    let s = '';
    for (let i = 0; i < 15; i++) {
        s += getChar(36 + getCode(rec.id, i) - getCode(id, i));
    }
    return s;
}
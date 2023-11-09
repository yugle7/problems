
import { writable } from "svelte/store";

export const theme = writable("light");

export function changeTheme() {
    theme.update((value) => value === 'dark' ? 'light' : 'dark');
}

export function loadTheme() {
    theme.set(localStorage.getItem('theme') || 'light');
    return theme.subscribe(value => {
        document.documentElement.dataset.theme = value;
        localStorage.setItem('theme', value);
    });
}
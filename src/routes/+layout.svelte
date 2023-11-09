<script>
	import '../styles.css';

	import { fail, menu, auth } from '$lib/data/popup';
	import { theme } from '$lib/data/theme';

	import Menu from './Menu.svelte';
	import Auth from './Auth.svelte';
	import Fail from './Fail.svelte';

	import { onMount } from 'svelte';

	onMount(() => {
		$theme = localStorage.getItem('theme') || 'light';
		document.documentElement.dataset.theme = $theme;
	});
</script>

<main>
	{#if $auth}
		<Auth />
	{:else if $menu}
		<Menu />
	{:else if $fail}
		<Fail />
	{:else}
		<slot />
	{/if}
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>

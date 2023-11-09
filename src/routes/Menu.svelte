<script>
	import { profile } from '$lib';
	import { menu, auth } from '$lib/data/popup';
	import { theme } from '$lib/data/theme';

	import Close from '$lib/view/icon/Close.svelte';

	function changeTheme() {
		$theme = $theme === 'dark' ? 'light' : 'dark';
		localStorage.setItem('theme', $theme);
		document.documentElement.dataset.theme = $theme;
	}
	const close = () => ($menu = false);
</script>

<Close action={close} />

<div class="main menu list">
	<a href="/problems" on:click={close}>Задачи</a>
	<a href="/users" on:click={close}>Пользователи</a>
	{#if $profile}
		<a href="/solutions" on:click={close}>Решения</a>
		<a href="/users/{$profile.id}" on:click={close}>Профиль</a>
	{:else}
		<button class="link" on:click={() => ($auth = 'login')}>Вход</button>
	{/if}
	<button class="link" on:click|preventDefault={changeTheme}>
		{$theme === 'light' ? 'Тьма' : 'Свет'}
	</button>
</div>

<style>
	a {
		text-align: center;
	}
</style>

<script>
	import { getTitle } from '$lib/load/user';
	import { profile } from '$lib';

	import Header from '$lib/view/show/Header.svelte';
	import Menu from '$lib/view/icon/Menu.svelte';
	import Params from '$lib/view/icon/Params.svelte';

	import ToUser from './ToUser.svelte';

	export let users;
	export let params;
</script>

<Header>
	<Menu />
	<div class="header">Пользователи</div>
	<Params />
</Header>

<div class="main item">
	<h1 class="title">{getTitle(params)}</h1>
	{#each users as user (user.id)}
		{#if $profile && user.id === $profile.id}
			<ToUser {params} />
		{:else}
			<ToUser {user} {params} />
		{/if}
	{/each}
</div>

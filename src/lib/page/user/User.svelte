<script>
	import { profile } from '$lib';
	import { dict } from '$lib/load/user';

	import Header from '$lib/view/show/Header.svelte';
	import Back from '$lib/view/icon/Back.svelte';
	import Logout from '$lib/view/icon/Logout.svelte';
	import Login from '$lib/view/icon/Login.svelte';
	import Me from '$lib/view/icon/Me.svelte';

	import MyProfile from './MyProfile.svelte';
	import Profile from './Profile.svelte';

	export let user;
</script>

<Header>
	<Back to="users" />
	<div class="title">{dict.role[user.role]}</div>
	{#if $profile && user.me}
		<Logout />
	{:else if $profile}
		<Me />
	{:else}
		<Login />
	{/if}
</Header>

{#if $profile && user.me}
	<MyProfile />
{:else}
	<Profile {user} />
{/if}

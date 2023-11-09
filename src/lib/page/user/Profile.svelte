<script>
	import { profile } from '$lib';
	import { canShowSolutions } from '$lib/load/solution';

	import Name from './Name.svelte';
	import EditedFriend from './EditedFriend.svelte';
	import Position from './Position.svelte';

	import Contacts from './Contacts.svelte';

	import ToProblems from './ToProblems.svelte';
	import ToSolutions from './ToSolutions.svelte';

	export let user;
</script>

<div class="main menu item center">
	<div class="under">
		<Name {user} />
		{#if $profile}<EditedFriend {user} />{/if}
	</div>
	<Position {user} />

	{#if user.email}{user.email}{/if}
	{#if user.contacts}<Contacts {user} />{/if}

	{#if user.problems > 0}<ToProblems {user} />{/if}
	{#if user.solutions > 0 && canShowSolutions($profile)}<ToSolutions {user} />{/if}
</div>

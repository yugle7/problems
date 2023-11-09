<script>
	import { profile } from '$lib';
	import { auth, edit } from '$lib/data/popup';

	import { canAddProblem } from '$lib/load/user';
	import { canShowSolutions } from '$lib/load/solution';

	import Name from './Name.svelte';
	import Position from './Position.svelte';

	import EditedEmail from './EditedEmail.svelte';
	import Contacts from './Contacts.svelte';

	import ToProblems from './ToProblems.svelte';
	import ToSolutions from './ToSolutions.svelte';
	import ToFriends from './ToFriends.svelte';
</script>

<div class="main menu item center">
	<div class="under">
		<button class="link" on:click={() => ($auth = 'name')}><Name /></button>
		<span class="subtitle">Это я</span>
	</div>
	<Position />

	<EditedEmail />
	{#if $profile.contacts}<Contacts />{/if}

	<div class="under">
		{#if $profile.problems > 0}<ToProblems />{/if}
		{#if canAddProblem($profile)}
			<button class="link ask" on:click={() => ($edit = 'problem')}>Предложить задачу?</button>
		{/if}
	</div>
	{#if $profile.friends > 0}<ToFriends />{/if}
</div>

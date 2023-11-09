<script>
	import { page } from '$app/stores';
	import { profile } from '$lib';

	import { edit, fail } from '$lib/data/popup';
	import { users } from '$lib/data/cache';
	import { getUser } from '$lib/load/user';

	import AddedProblem from '$lib/page/problem/AddedProblem.svelte';
	import User from '$lib/page/user/User.svelte';

	let user;

	async function update() {
		user = await getUser($users, $page.params.id, $profile);
		if (!user) $fail = 'Пользователь не найден!';
	}
	$: if (user?.id !== $page.params.id) {
		update();
	}
</script>

{#if $edit === 'problem'}
	<AddedProblem />
{:else if user}
	<User {user} />
{/if}

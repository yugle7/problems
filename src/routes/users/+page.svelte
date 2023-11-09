<script>
	import { profile } from '$lib';
	import { page } from '$app/stores';

	import { edit } from '$lib/data/popup';
	import { params, users } from '$lib/data/cache';
	import { getUsers } from '$lib/load/user';

	import Users from '$lib/page/user/Users.svelte';
	import EditedParams from '$lib/page/user/EditedParams.svelte';

	const author = $page.url.searchParams.get('author');
	$params = { sort: 'position', author };

	let data;
	async function update() {
		data = await getUsers($users, $params, $profile);
	}

	$edit = undefined;
	$: if ($edit === undefined) {
		$edit = null;
		update();
	}
</script>

{#if $edit === 'params'}
	<EditedParams />
{:else if data}
	<Users users={data.users} params={data.params} />
{/if}

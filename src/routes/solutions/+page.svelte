<script>
	import { page } from '$app/stores';
    import { profile } from '$lib';

	import { edit } from '$lib/data/popup';
	import { solutions, params } from '$lib/data/cache';
	import { getSolutions } from '$lib/load/solution';

	import Solutions from '$lib/page/solution/Solutions.svelte';
	import EditedParams from '$lib/page/solution/EditedParams.svelte';

	const author = $page.url.searchParams.get('author');
	$params = {
		sort: '-updated',
		status: author ? null : '4',
		progress: author ? null : '2',
		author,
		weight: null,
		categories: []
	};

	let data;
	async function update() {
		data = await getSolutions($solutions, $params, $profile);
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
	<Solutions solutions={data.solutions} params={data.params} />
{/if}

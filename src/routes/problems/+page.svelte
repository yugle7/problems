<script>
	import { profile } from '$lib';
	import { page } from '$app/stores';

	import { edit } from '$lib/data/popup';
	import { params, problems } from '$lib/data/cache';

	import Problems from '$lib/page/problem/Problems.svelte';
	import EditedParams from '$lib/page/problem/EditedParams.svelte';

	import { getProblems } from '$lib/load/problem';

	const author = $page.url.searchParams.get('author');
	$params = {
        search: '',
        sort: '-created',
        status: author ? null : '4',
        author,
        weight: null,
        categories: [],
        progresses: []
    };

	let data;
	async function update() {
		data = await getProblems($problems, $params, $profile);
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
	<Problems problems={data.problems} params={data.params} />
{/if}

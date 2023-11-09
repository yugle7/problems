<script>
	import { page } from '$app/stores';
	import { profile } from '$lib';

	import { edit } from '$lib/data/popup';
	import { problems } from '$lib/data/cache';
	import { getProblem } from '$lib/load/problem';

	import Problem from '$lib/page/problem/Problem.svelte';
	import EditedProblem from '$lib/page/problem/EditedProblem.svelte';

	let problem;

	async function update() {
		problem = await getProblem($problems, $page.params.id, $profile);
	}
	$: if (problem?.id !== $page.params.id) {
		update();
	}

	$edit = null;
	$: if ($edit === undefined) {
		$edit = null;
		problem = problem;
	}
</script>

{#if problem}
	{#if $edit === 'problem'}
		<EditedProblem {problem} />
	{:else}
		<Problem {problem} />
	{/if}
{/if}

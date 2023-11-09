<script>
	import { page } from '$app/stores';

	import { solutions } from '$lib/data/cache';
	import { getSolution } from '$lib/load/solution';

	import Solution from '$lib/page/solution/Solution.svelte';

	let solution;

	async function update() {
		solution = await getSolution($solutions, $page.params.id);
	}
	$: if (solution?.id !== $page.params.id) {
		update();
	}
</script>

{#if solution}
	<Solution {solution} />
{/if}

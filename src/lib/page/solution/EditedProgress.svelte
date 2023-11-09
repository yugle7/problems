<script>
	import { dict, setProgress } from '$lib/load/solution';

	export let solution;

	const to = {
		2: [3, 4, 5],
		3: [2, 4, 5],
		4: [2, 3, 5],
		5: [2, 3, 4]
	};
	
	function editProgress(progress) {
		return async () => {
			await setProgress(solution, progress);
			solution = solution;
		}
	}
</script>

{#if solution.progress >= 2}
	<div class="near">
		<span>{dict.progress[solution.progress]}</span>
		&rarr;
		{#each to[solution.progress] as progress (progress)}
			<button class="link" on:click={editProgress(progress)}>
				{dict.progress[progress]}
			</button>
		{/each}
	</div>
{/if}



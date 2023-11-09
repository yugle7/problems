<script>
	import { profile } from '$lib';
	import { likeProblem } from '$lib/load/problem';

	import Count from '$lib/view/icon/Count.svelte';

	export let problem;

	function update(like) {
		return async () => {
			await likeProblem(problem, like, $profile);
			problem = problem;
		};
	}
</script>

<div class="near">
	<button class="link" on:click={update(1)}>
		<Count key="like" green={problem.solution.like === 1} count={problem.like} />
	</button>
	<button class="link" on:click={update(-1)}>
		<Count key="dislike" red={problem.solution.like === -1} count={problem.dislike} />
	</button>
</div>

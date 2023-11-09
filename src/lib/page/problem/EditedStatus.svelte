<script>
	import { pb } from '$lib';
	import { dict, isLiked } from '$lib/load/problem';

	export let problem;

	const to = {
		0: [1, 2, 3],
		1: [0],
		2: [0],
		3: [0],
		4: [0]
	};

	if (isLiked(problem)) to[3].push(4);

	function update(status) {
		return async () => {
			pb.collection('problems').update(problem.id, { status });
			problem.status = status;
		};
	}
</script>

<div class="near">
	<span>{dict.status[problem.status]}</span>
	&rarr;
	{#each to[problem.status] as status (status)}
		<button class="link" on:click={update(status)}>
			{dict.status[status]}
		</button>
	{/each}
</div>

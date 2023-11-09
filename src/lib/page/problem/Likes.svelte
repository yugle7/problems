<script>
	import Count from '$lib/view/icon/Count.svelte';

	export let problem;
</script>

<div class="near">
	<Count key="like" count={problem.like} />
	<Count key="dislike" count={problem.dislike} />
</div>

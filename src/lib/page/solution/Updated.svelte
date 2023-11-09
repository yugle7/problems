<script>
	import Author from '$lib/view/show/Author.svelte';
	import Date from '$lib/view/show/Date.svelte';

	export let solution;
	console.log(solution);
</script>

<span class="right">
	<Author author={solution.author} />
	<Date time={solution.updated} />
</span>

<script>
	import Author from '$lib/view/show/Author.svelte';
	import Date from '$lib/view/show/Date.svelte';

	export let problem;
</script>

<span class="right">
	<Author author={problem.author} />
	<Date time={problem.created} />
</span>

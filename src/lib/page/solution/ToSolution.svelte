<script>
	import Title from './Title.svelte';
	import Answer from './Answer.svelte';

	export let solution;
	export let params;
</script>

<div class="under">
	<Title {solution} {params} />
	<Answer {solution} />
</div>

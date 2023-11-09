<script>
	import Title from './Title.svelte';
	import Condition from './Condition.svelte';
	import Notes from './Notes.svelte';

	export let problem;
	export let params;
</script>

<div class="item">
	<Title {problem} {params} />
	<Condition {problem} />
	{#if problem.notes}<Notes {problem} />{/if}
</div>


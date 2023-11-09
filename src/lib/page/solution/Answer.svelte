<script>
	import Text from '$lib/view/show/Text.svelte';
	import Updated from './Updated.svelte';

	export let solution;
</script>

<div class="under menu">
	{#if solution.answer}
		<Text text={solution.answer} />
	{/if}
	{#if solution.proof}
		<Text text={solution.proof} />
	{/if}
	<Updated {solution} />
</div>

<script>
	import Hide from '$lib/view/show/Hide.svelte';
	import Text from '$lib/view/show/Text.svelte';

	export let problem;
</script>

<Hide title="Решение">
	{#if problem.answer}
		<Text text={problem.answer} />
	{/if}
	{#if problem.proof}
		<Text text={problem.proof} />
	{/if}
</Hide>

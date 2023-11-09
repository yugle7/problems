<script>
	import { edit } from '$lib/data/popup';
	import { dict } from '$lib/load/problem';

	import Text from '$lib/view/show/Text.svelte';

	export let solution;
</script>

<div class="main menu under">
	{#if solution.next}
		{#if solution.next.answer}
			<Text text={solution.next.answer} />
		{/if}
		{#if solution.next.proof}
			<Text text={solution.next.proof} />
		{/if}
	{/if}

	<div class="near right">
		{#if solution.progress > 0}
			<span class="subtitle">{dict.progress[solution.progress]}</span>
		{/if}
		<button class="right" on:click={() => ($edit = 'solution')}>
			{solution.progress > 0 ? 'Исправить' : 'Решить'}
		</button>
	</div>
</div>

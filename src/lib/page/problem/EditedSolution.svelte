<script>
	import { profile } from '$lib';
	
	import { edit } from '$lib/data/popup';
	import { params } from '$lib/data/cache';
	import { updateSolution } from '$lib/load/solution';

	import Text from '$lib/view/edit/Text.svelte';

	export let solution;
	$params = { ...solution.next };

	$: empty = $params.answer === '' && $params.proof === '';
	$: equal = $params.answer === solution.answer && $params.proof === solution.proof;

	$: send = !empty && (!equal || solution.progress != 2);
	$: save = !empty && (!equal || solution.progress != 1);

	function editSolution(progress) {
		return async () => {
			$edit = null;

			solution.progress = progress;
			updateSolution(solution, $params, $profile);
		};
	}
</script>

<form class="main menu item" on:submit|preventDefault={editSolution(2)}>
	<Text key="answer" label="Ответ" />
	<Text key="proof" label="Доказательство" />
	<div class="right">
		{#if save}
			<button class="link" on:click={editSolution(1)}>Сохранить</button>
		{/if}
		<button class="link" on:click={() => ($edit = null)}>Отменить</button>
		<button disabled={!send} type="submit">Отправить</button>
	</div>
</form>

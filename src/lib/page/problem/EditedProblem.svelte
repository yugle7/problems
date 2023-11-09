<script>
	import { profile } from '$lib';
	import { onMount } from 'svelte';

	import { edit } from '$lib/data/popup';
	import { params } from '$lib/data/cache';
	import { dict, loadDraft, updateDraft, updateProblem, canUpdateProblem } from '$lib/load/problem';

	import Close from '$lib/view/icon/Close.svelte';
	import Checks from '$lib/view/edit/Checks.svelte';
	import Text from '$lib/view/edit/Text.svelte';

	export let problem;

	onMount(async () => {
		$params = await loadDraft($profile, problem);
	});

	async function editProblem() {
		if (canUpdateProblem($profile, problem)) {
			await updateProblem(problem, $params);
		} else {
			await updateDraft(problem, $params);
		}
		$edit = undefined;
	}
</script>

<Close action={() => ($edit = null)} />

<form class="main menu item" on:submit|preventDefault={editProblem}>
	<Text key="title" label="Заголовок" />
	<Checks key="categories" labels={dict.category} />
	<Text key="condition" label="Условие" />
	<Text key="notes" label="Примечания" />
	<Text key="answer" label="Ответ" />
	<Text key="proof" label="Доказательство" />
	<button class="right" type="submit">Обновить</button>
</form>

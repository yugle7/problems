<script>
	import { pb, profile } from '$lib';
	import { goto } from '$app/navigation';

	import { edit } from '$lib/data/popup';
	import { params } from '$lib/data/cache';
	import { dict } from '$lib/load/problem';

	import Close from '$lib/view/icon/Close.svelte';

	import Checks from '$lib/view/edit/Checks.svelte';
	import Text from '$lib/view/edit/Text.svelte';

	$params = {};

	async function addProblem() {
		const problem = await pb.collection('problems').create({ ...$params, author: $profile.id });

		goto(`/problems/${problem.id}`);
		$edit = null;
	}
</script>

<Close action={() => ($edit = null)} />

<form class="main menu item" on:submit|preventDefault={addProblem}>
	<Text key="title" label="Заголовок" />
	<Checks key="categories" labels={dict.category} />
	<Text key="condition" label="Условие" />
	<Text key="notes" label="Примечания" />
	<Text key="answer" label="Ответ" />
	<Text key="proof" label="Доказательство" />
	<button class="right" type="submit">Создать</button>
</form>

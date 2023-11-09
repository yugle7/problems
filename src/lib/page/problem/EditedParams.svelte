<script>
	import { profile } from '$lib';

	import { edit } from '$lib/data/popup';
	import { dict, canShowStatus } from '$lib/load/problem';

	import Close from '$lib/view/icon/Close.svelte';
	import Search from '$lib/view/edit/Search.svelte';
	import Clicks from '$lib/view/edit/Clicks.svelte';
	import Radio from '$lib/view/edit/Radio.svelte';
	import Checks from '$lib/view/edit/Checks.svelte';
</script>

<Close action={() => ($edit = null)} />

<form class="main menu list" on:submit|preventDefault={() => ($edit = undefined)}>
	<Search key="search" label="Поиск" />
	<Clicks key="weight" label="Вес" values={dict.weight} />
	<Checks key="categories" labels={dict.category} />
	{#if $profile}
		<Checks key="progresses" labels={dict.progress} />
		{#if canShowStatus($profile)}
			<Radio key="status" labels={dict.status} />
		{/if}
	{/if}
	<Radio key="sort" labels={dict.sort} />
	<button class="right" type="submit">Показать</button>
</form>

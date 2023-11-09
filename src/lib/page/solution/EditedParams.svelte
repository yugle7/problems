<script>
	import { edit } from '$lib/data/popup';
	import { profile } from '$lib';
	import { dict } from '$lib/load/solution';

	import Close from '$lib/view/icon/Close.svelte';
	import Clicks from '$lib/view/edit/Clicks.svelte';
	import Radio from '$lib/view/edit/Radio.svelte';
	import Checks from '$lib/view/edit/Checks.svelte';
</script>

<Close action={() => ($edit = null)} />

<form class="main menu list" on:submit|preventDefault={() => ($edit = undefined)}>
	<Clicks key="weight" label="Вес" values={dict.weight} />
	<Checks key="categories" labels={dict.category} />
	{#if $profile}
		<Radio key="progress" labels={dict.progress} />
		<Radio key="status" labels={dict.status} />
	{/if}
	<Radio key="sort" labels={dict.sort} />
	<button class="right" type="submit">Показать</button>
</form>

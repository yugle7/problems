<script>
	import { edit } from '$lib/data/popup';
	import { dict } from '$lib/load/user';

	import Close from '$lib/view/icon/Close.svelte';
	import Radio from '$lib/view/edit/Radio.svelte';
</script>

<Close action={() => ($edit = null)} />

<form class="main menu list" on:submit={() => ($edit = undefined)}>
	<Radio key="role" labels={dict.role} all="Все" />
	<Radio key="sort" labels={dict.sort} />
	<button class="right" type="submit">Показать</button>
</form>

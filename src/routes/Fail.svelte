<script>
	import { fail } from '$lib/data/popup';
	import Close from '$lib/view/icon/Close.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(() => goto('/users'));
</script>

<Close action={() => ($fail = null)} />

<h1>{$fail}</h1>

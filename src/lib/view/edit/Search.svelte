<script>
	import { params } from '$lib/data/cache';

	export let key;
	export let label;
</script>

<input placeholder={label} id={key} type="search" bind:value={$params[key]} />

<script>
	import { params } from '$lib/data/cache';

	export let key;
	export let label;
</script>

<input placeholder={label} id={key} type="text" name={key} bind:value={$params[key]} />

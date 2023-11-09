<script>
	import { params } from '$lib/data/cache';
	
	export let key;
	export let label;
</script>

<label>
	<input type="checkbox" name={key} bind:checked={$params[key]} />
	{label}
</label>

<style>
	label {
		display: flex;
		flex-direction: row;
		line-height: 40px;
	}
	input {
		width: 20px;
		padding: 10px;
		margin: 10px;
	}
	input:checked {
		accent-color: var(--color-4);
	}
</style>

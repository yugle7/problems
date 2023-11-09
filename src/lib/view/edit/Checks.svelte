<script>
	import { params } from '$lib/data/cache';

	export let key;
	export let labels;

</script>

<div>
	{#each labels as label, value (value)}
		<label>
			<input type="checkbox" name={key} {value} bind:group={$params[key]} />
			{label}
		</label>
	{/each}
</div>

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

<script>
	import { params } from '$lib/data/cache';

	export let key;
	export let labels;
	export let all = null;
</script>

<div>
	{#if all}
		<label>
			<input type="radio" value={null} bind:group={$params[key]} />
			{all}
		</label>
	{/if}
	{#each Object.entries(labels) as [value, label] (value)}
		<label>
			<input type="radio" {value} bind:group={$params[key]} />
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

<script>
	import { params } from '$lib/data/cache';

	export let key;
	export let label;
	export let values;

	console.log($params, $params[key], key);
</script>

<div>
	{label}
	{#each values as value (value)}
		<button
			on:click|preventDefault={() => ($params[key] = $params[key] === value ? null : value)}
			style="background-color: var(--color-{$params[key] === value ? 6 : 4});"
		>
			{value}
		</button>
	{/each}
</div>

<style>
	div {
		display: flex;
		flex-direction: row;
		gap: 10px;
		align-items: center;
	}
	button {
		width: auto;
		padding: 7px 12px;
		float: right;
		margin: 0;
	}
</style>

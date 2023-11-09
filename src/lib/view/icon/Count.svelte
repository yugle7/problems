<script>
	export let red = false;
	export let green = false;

	export let key;
	export let count;
</script>

<div>
	<img class:green class:red src="/statuses/{key}.svg" alt={key} />
	{#if count > 0}<span>{count}</span>{/if}
</div>

<style>
	.green {
		filter: sepia(100%) saturate(10000%) hue-rotate(150deg);
	}
	.red {
		filter: sepia(100%) saturate(10000%) hue-rotate(50deg);
	}
	div {
		display: flex;
		align-items: flex-end;
	}
	img {
		padding: 0;
		width: 30px;
	}
	
</style>

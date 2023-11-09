<script>
	export let block;
</script>

<p>
	{#each block as b}
		{#if Array.isArray(b)}
			{#if b.length === 1}
				{#if block.length === 1}
					<pre>{b[0]}</pre>
				{:else}
					<code>{b[0]}</code>
				{/if}
			{:else}
				<a href={b[0]}>{b[1]}</a>
			{/if}
		{:else}
			{b}
		{/if}
	{/each}
</p>

<style>
	pre,
	code {
		padding: 0;
		margin: 0;
	}
</style>

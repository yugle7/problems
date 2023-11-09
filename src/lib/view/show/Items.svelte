<script>
	export let items;
</script>

<ul>
	{#each items as item (item)}
		<li>{item}</li>
	{/each}
</ul>

<style>
	ul {
		display: inline;
		list-style: none;
	}
	li {
		display: inline;
	}
	li:after {
		content: ', ';
	}
	li:last-child:after {
		content: '';
	}
</style>

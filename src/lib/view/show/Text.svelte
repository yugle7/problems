<script>
	import { parse } from '$lib/algo/text';
	import Block from '$lib/view/show/Block.svelte';

	export let text;
</script>

<div>
	{#each parse(text) as block}
		<Block {block} />
	{/each}
</div>

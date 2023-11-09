<script>
	let hide = true;
	export let title;

	$: data = hide
		? { to: 'down', alt: 'show', display: 'none' }
		: { to: 'up', alt: 'hide', display: 'block' };
</script>

<button class="link near" on:click={() => (hide = !hide)}>
	<h3>{title}</h3>
	<img class="icon" src="/actions/caret-{data.to}.svg" alt={data.alt} />
</button>

<div style="display: {data.display};">
	<slot />
</div>

<style>
	button {
		display: flex;
	}
	img {
		padding: 0;
		width: 30px;
	}
</style>

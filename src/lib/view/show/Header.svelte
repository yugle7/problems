<script>
	import { onDestroy, onMount } from 'svelte';

	let scrollY = 0;
	let visible = true;

	function hide() {
		visible = scrollY >= window.scrollY;
		scrollY = window.scrollY;
	}
	onMount(() => {
		window.addEventListener('scroll', hide);
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('scroll', hide);
		}
	});
</script>

<nav class:visible>
	<slot />
</nav>

<style>
	nav {
		position: sticky;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		transition: top 0.3s;
		top: -50px;
		height: 50px;
		width: 100%;
		background: var(--color-0);
		border-bottom: 1px solid var(--color-1);
		z-index: 1;
	}
	.visible {
		top: 0;
	}
</style>

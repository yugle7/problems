<script>
	export let action;
</script>

<button class="link" on:click={action}>
	<img class="icon" src="/actions/cross.svg" alt="close" />
</button>

<style>
	button {
		position: fixed;
		top: 0;
		right: 0;
	}
</style>

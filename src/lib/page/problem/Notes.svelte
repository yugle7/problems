<script>
	import Text from '$lib/view/show/Text.svelte';
	import Hide from '$lib/view/show/Hide.svelte';

	export let problem;
</script>

<Hide title="Примечания">
	<Text text={problem.notes} />
</Hide>

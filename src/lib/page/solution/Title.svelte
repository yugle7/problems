<script>
	import { getSubtitle } from '$lib/load/solution';

	export let solution;
	export let params;
</script>

<div class="under">
	<a href="/solutions/{solution.id}">
		<h2>{solution.title}</h2>
	</a>
	<div class="subtitle">{getSubtitle(solution, params)}</div>
</div>

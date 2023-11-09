<script>
	import { page } from '$app/stores';
	import { getSubtitle } from '$lib/load/problem';

	export let problem;
	export let params = null;

	const to = `/problems/${problem.id}`;
</script>

<div class="under">
	{#if $page.url.pathname === to}
		<h2>{problem.title}</h2>
	{:else}
		<a href={to}><h2>{problem.title}</h2></a>
	{/if}
	<span class="subtitle">{getSubtitle(problem, params)}</span>
</div>

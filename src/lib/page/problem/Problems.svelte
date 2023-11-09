<script>
	import { getTitle } from '$lib/load/problem';

	import Header from '$lib/view/show/Header.svelte';
	import Menu from '$lib/view/icon/Menu.svelte';
	import Params from '$lib/view/icon/Params.svelte';

	import ToProblem from './ToProblem.svelte';

	export let problems;
	export let params;
</script>

<Header>
	<Menu />
	<div class="header">Задачи</div>
	<Params />
</Header>

<div class="main list">
	<h1 class="title">{getTitle(params)}</h1>
	{#each problems as problem (problem.id)}
		<ToProblem {problem} {params} />
	{/each}
</div>

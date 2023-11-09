<script>
	import { getTitle } from '$lib/load/solution';

	import Header from '$lib/view/show/Header.svelte';
	import Menu from '$lib/view/icon/Menu.svelte';
	import Params from '$lib/view/icon/Params.svelte';

	import ToSolution from './ToSolution.svelte';

	export let params;
	export let solutions;
</script>

<Header>
	<Menu />
	<div class="header">Решения</div>
	<Params />
</Header>

<div class="main list">
	<h1 class="title">{getTitle(params)}</h1>
	{#each solutions as solution (solution.id)}
		<ToSolution {solution} {params} />
	{/each}
</div>


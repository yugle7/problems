<script>
	import { profile } from '$lib';
	import { canEditProgress } from '$lib/load/solution';

	import Header from '$lib/view/show/Header.svelte';
	import Back from '$lib/view/icon/Back.svelte';
	import Chat from '$lib/view/icon/Chat.svelte';

	import ToProblem from '../problem/ToProblem.svelte';
	import Solution from '../problem/Solution.svelte';

	import EditedProgress from './EditedProgress.svelte';
	import Answer from './Answer.svelte';

	export let solution;
	const problem = solution.problem;
</script>

<Header>
	<Back to="solutions" />
	<div class="title">Решение</div>
	<Chat />
</Header>

{#if canEditProgress($profile, solution)}
	<div class="main menu item">
		<ToProblem {problem} />
		{#if problem.solved}<Solution {problem} />{/if}
		<Answer {solution} />
		<EditedProgress {solution} />
	</div>
{/if}

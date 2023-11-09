<script>
	import { profile } from '$lib';
	import { edit } from '$lib/data/popup';
	import { canShowSolution, canEditProblem, canEditStatus } from '$lib/load/problem';

	import Header from '$lib/view/show/Header.svelte';
	import Back from '$lib/view/icon/Back.svelte';
	import Chat from '$lib/view/icon/Chat.svelte';

	import Title from './Title.svelte';
	import Condition from './Condition.svelte';
	import Notes from './Notes.svelte';

	import Solution from './Solution.svelte';
	import ToEditProblem from './ToEditProblem.svelte';
	import EditedStatus from './EditedStatus.svelte';
	import EditedSolution from './EditedSolution.svelte';
	import MySolution from './MySolution.svelte';

	export let problem;
</script>

<Header>
	<Back to="problems" />
	<div class="title">Задачa</div>
	<Chat />
</Header>

<div class="main menu item">
	<Title {problem} />
	<Condition {problem} />
	{#if problem.notes}<Notes {problem} />{/if}
	{#if problem.solved && canShowSolution($profile, problem)}<Solution {problem} />{/if}
	{#if canEditProblem($profile, problem)}<ToEditProblem />{/if}
	{#if canEditStatus($profile, problem)}<EditedStatus {problem} />{/if}
</div>

{#if problem.solution}
	{#if $edit === 'solution'}
		<EditedSolution solution={problem.solution} />
	{:else}
		<MySolution solution={problem.solution} />
	{/if}
{/if}

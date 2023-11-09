<script>
	import { profile } from '$lib';
	import { canLikeProblem } from '$lib/load/problem';

	import Text from '$lib/view/show/Text.svelte';
	import Created from './Created.svelte';
	import Likes from './Likes.svelte';
	import EditedLikes from './EditedLikes.svelte';

	export let problem;
</script>

<div>
	<Text text={problem.condition} />
	{#if problem.author}
		<span class="away">
			{#if canLikeProblem($profile)}
				<EditedLikes {problem} />
			{:else}
				<Likes {problem} />
			{/if}
			<Created {problem} />
		</span>
	{/if}
</div>


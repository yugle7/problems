<script>
	import { profile } from '$lib';
	import { getLink, getView } from '$lib/algo/link';

	export let user = $profile;
</script>

<div class="under">
	{#each Object.entries(user.contacts) as [owner, login] (owner)}
		<a href={getLink(owner, login)} target="_blank">
			{getView(owner, login)}
		</a>
	{/each}
</div>

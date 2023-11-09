<script>
	import { profile } from '$lib';

	export let user = $profile;
</script>

<span>
	{#if user.position > 0}
		{user.position} место — {user.rating}
	{:else}
		Не в рейтинге
	{/if}
</span>

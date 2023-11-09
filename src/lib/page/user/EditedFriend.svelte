<script>
	import { triggerFriend } from '$lib/load/user';
	import { profile } from '$lib';

	export let user;

	async function update() {
		await triggerFriend($profile, user);
		user = user;
	}
</script>

<button class="link ask" on:click={update}>
	{#if user.friend}Друг{:else}Добавить в друзья?{/if}
</button>

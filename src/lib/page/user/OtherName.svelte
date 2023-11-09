<script>
	import { profile } from '$lib';

	import Name from './Name.svelte';
	import Friend from './EditedFriend.svelte';

	export let user;
</script>

<div>
	<Name {user} />
	{#if $profile}<Friend {user} />{/if}
</div>

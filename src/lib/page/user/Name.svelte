<script>
	import { getStyle } from '$lib/algo/user';
	import { profile } from '$lib';

	export let user = $profile;
</script>

<h1 style={getStyle(user)}>{user.username}</h1>
{#if user.fullname}<h2>{user.fullname}</h2>{/if}

<style>
	h1,
	h2 {
		text-align: center;
	}
</style>

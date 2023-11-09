<script>
	import { profile } from '$lib';
	import { plural } from '$lib/algo/name';

	export let user = $profile;
</script>

<a class="center" href="/users?author={user.id}">
	{plural(user.friends, ['друг', 'друга', 'друзей'])}
</a>

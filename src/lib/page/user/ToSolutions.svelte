<script>
	import { profile } from '$lib';
	import { plural } from '$lib/algo/name';

	export let user = $profile;
</script>

<a class="center" href="/solutions?author={user.id}">
	{plural(user.solutions, ['решение', 'решения', 'решений'])}
</a>

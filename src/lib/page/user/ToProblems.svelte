<script>
	import { plural } from '$lib/algo/name';

	export let user
</script>

<a class="center" href="/problems?author={user.id}">
	{plural(user.problems, ['задача', 'задачи', 'задач'])}
</a>

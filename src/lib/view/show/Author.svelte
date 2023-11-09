<script>
	import { getStyle } from '$lib/algo/user';
	export let author;
</script>

<a style={getStyle(author)} href="/users/{author.id}">
	{author.username}
</a>

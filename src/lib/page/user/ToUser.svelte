<script>
	import { profile } from '$lib';
	import { getSubtitle } from '$lib/load/user';
	import { getStyle } from '$lib/algo/user';

	export let user = $profile;
	export let params;

	const style = user == $profile ? getStyle(user) : null;
</script>

<div>
	<span class="position">{user.position}</span>
	<a {style} href="/users/{user.id}">{user.username}</a>
	<span class="subtitle">{getSubtitle(user, params)}</span>
	<span class="rating">{user.rating}</span>
</div>

<style>
	div {
		width: 100%;
		line-height: 2em;
	}
	.position {
		min-width: 50px;
		display: inline-block;
		text-align: center;
		padding-right: 10px;
	}
	.rating {
		float: right;
	}
	.subtitle {
		color: var(--color-7);
		padding-left: 5px;
	}
</style>

<script>
	import { profile } from '$lib';
	import { auth } from '$lib/data/popup';
	import { triggerEmailVisibility } from '$lib/load/user';
</script>

<div class="under">
	<button class="link" on:click={() => ($auth = 'contacts')}>{$profile.email}</button>
	<button class="link ask" on:click={triggerEmailVisibility($profile)}>
		{$profile.emailVisibility ? 'Скрыть почту от всех?' : 'Сделать почту видимой всем?'}
	</button>
</div>

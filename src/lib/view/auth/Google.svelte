<script>
	import { authWithProvider } from '$lib/algo/auth';
	import { auth } from '$lib/data/popup';
	import { goto } from '$app/navigation';

	let authError;
</script>

<button
	on:click|preventDefault={async () => {
		try {
			const res = await authWithProvider(1);
			if (res) {
				if (res.meta.isNew) {
					goto('/users/' + res.record.id);
				}
				$auth = null;
			} else {
				authError = 'не удалось авторизоваться';
			}
		} catch (err) {
			authError = 'не удалось авторизоваться';
		}
	}}
>
	Google
</button>
{#if authError}
	<span class="failed">{authError}</span>
{/if}

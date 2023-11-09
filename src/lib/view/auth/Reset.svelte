<script>
	import { pb } from '$lib';
	import { auth } from '$lib/data/popup';
	import { checkEmail } from '$lib/algo/auth';

	let errors = {};

	let email = '';
	let passwordReset = false;

	async function reset() {
		if (disabled) {
			return;
		}
		try {
			await pb.collection('users').requestPasswordReset(email);
			passwordReset = true;
		} catch (err) {
			errors.auth = err.message;
		}
	}
	$: disabled = Object.values(errors).some((e) => e) || email === '';
</script>

{#if passwordReset}
	<div class="main menu item form">
		Ссылка восстановления пароля была успешно отправлена на почту <code>{email}</code>.
		<button class="link" on:click={() => ($auth = null)}>Вернуться на сайт?</button>
	</div>
{:else}
	<form class="main menu item form" on:submit|preventDefault={reset} autocomplete="off">
		<!-- email -->
		<div>
			<input
				autocomplete="off"
				class:failed={errors.email}
				placeholder="Email"
				bind:value={email}
				on:keydown={() => {
					delete errors.email;
					delete errors.auth;
				}}
				on:blur={() => {
					errors.email = checkEmail(email);
				}}
				id="email"
				type="email"
				name="email"
				required
			/>
			{#if errors.email}
				<span class="failed">{errors.email}</span>
			{/if}
		</div>
		<!-- submit -->
		<div>
			{#if errors.auth}
				<span class="failed">{errors.auth}</span>
			{/if}
			<button {disabled} type="submit">Восстановить</button>
		</div>
		<button class="link" on:click={() => ($auth = 'login')}>Вернуться в форму входа?</button>
	</form>
{/if}

<style>
	div {
		display: flex;
		flex-direction: column;
	}
	button.link {
		font-size: var(--font-0);
		align-self: flex-end;
	}
</style>

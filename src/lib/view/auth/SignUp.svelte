<script>
	import { pb, profile } from '$lib';
	import { checkPassword, checkEmail } from '$lib/algo/auth';
	import { checkUsername } from '$lib/algo/name';
	import { auth } from '$lib/data/popup';

	import Close from '$lib/view/icon/Close.svelte';

	let username = '';
	let email = '';
	let password = '';

	let verification = false;

	let errors = {};

	$: disabled =
		Object.values(errors).some((e) => e) || username === '' || email === '' || password === '';

	async function login() {
		try {
			await pb.collection('users').authWithPassword(email, password);
			const res = await pb.collection('users').requestVerification(email);
			if (res) {
				verification = true;
			} else {
				errors.email = 'не получилось отправить письмо';
			}
		} catch (err) {
			errors.auth = err.message;
		}
	}
	async function signUp() {
		if (disabled) {
			return;
		}
		try {
			await pb.collection('users').create({
				email,
				password,
				passwordConfirm: password,
				username,
				role: 0
			});
			await login();
		} catch (err) {
			for (const [key, data] of Object.entries(err.originalerrors.data.data)) {
				errors[key] = data.message;
			}
		}
	}
</script>

<Close action={() => ($auth = null)} />

{#if verification}
	<div class="main menu item form">
		<span>
			Hа почту <code>{email}</code> отправлено письмо с просьбой ее подтвердить.
		</span>
		{#if $profile}
			<a href="/users/{$profile.id}" on:click={() => ($auth = null)}>Перейти в аккаунт?</a>
		{/if}
	</div>
{:else}
	<form class="main menu item form" autocomplete="off" on:submit|preventDefault={signUp}>
		<!-- username -->
		<div>
			<input
				autocomplete="off"
				class:failed={errors.username}
				placeholder="Логин"
				bind:value={username}
				on:keydown={() => {
					delete errors.username;
					delete errors.auth;
				}}
				on:blur={() => {
					errors.username = checkUsername(username);
				}}
				id="username"
				type="text"
				name="username"
				required
			/>
			{#if errors.username}
				<span class="failed">{errors.username}</span>
			{/if}
		</div>
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
		<!-- password -->
		<div>
			<input
				class:failed={errors.password}
				placeholder="Пароль"
				bind:value={password}
				on:keydown={() => {
					delete errors.auth;
					delete errors.password;
				}}
				on:blur={() => {
					errors.password = checkPassword(password);
				}}
				id="password"
				type="password"
				name="password"
				required
			/>
			{#if errors.password}
				<span class="failed">{errors.password}</span>
			{/if}
		</div>
		<!-- submit -->
		<div>
			{#if errors.auth}
				<span class="failed">{errors.auth}</span>
			{/if}
			<button {disabled} type="submit">Регистрация</button>
		</div>
		<button class="link" on:click={() => ($auth = 'login')}>Вернуться в форму входа?</button>
	</form>
{/if}

<style>
	div {
		display: flex;
		flex-direction: column;
	}

	a,
	button.link {
		font-size: var(--font-0);
		align-self: flex-end;
	}
</style>

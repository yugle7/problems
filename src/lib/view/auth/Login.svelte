<script>
	import { pb } from '$lib';
	import { auth } from '$lib/data/popup';
	import { checkPassword, checkEmail } from '$lib/algo/auth';

	import Google from './Google.svelte';
	import Yandex from './Yandex.svelte';

	let email = '';
	let password = '';

	let errors = {};

	$: disabled = Object.values(errors).some((e) => e) || password === '' || email === '';

	async function login() {
		try {
			await pb.collection('users').authWithPassword(email, password);
			$auth = null;
		} catch (err) {
			errors.auth = err.message;
		}
	}
</script>

<form class="main menu item form" on:submit|preventDefault on:submit={login}>
	<Google />
	<Yandex />
	<span>или</span>
	<!-- email -->
	<div>
		<input
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
				delete errors.password;
				delete errors.auth;
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
	<button class="link" on:click={() => ($auth = 'reset')}>Забыли пароль?</button>
	<!-- submit -->
	<div>
		{#if errors.auth}
			<span class="failed">{errors.auth}</span>
		{/if}
		<button {disabled} type="submit">Войти</button>
	</div>
	<button class="link" on:click={() => ($auth = 'signup')}>Eще нет аккаунта?</button>
</form>

<style>
	div {
		display: flex;
		flex-direction: column;
	}
	input {
		width: inherit;
	}
	button.link {
		font-size: var(--font-0);
		align-self: flex-end;
	}
	span {
		font-size: var(--font-0);
		align-self: center;
	}
</style>

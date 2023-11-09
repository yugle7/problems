<script>
	import { pb, profile } from '$lib';
	import { auth } from '$lib/data/popup';
	import { dict } from '$lib/load/user';

	import { checkPassword, checkEmail } from '$lib/algo/auth';
	import { normFullname, checkFullname, checkUsername } from '$lib/algo/name';

	let username = $profile.username;
	let fullname = $profile.fullname;

	let email = $profile.email;
	let password = '';
	let emailChange = false;

	let errors = {};

	const provider = dict.provider[$profile.provider];
	
	const useEmailPassword = provider === 'email/password';
	$: emailPasswordFailed = useEmailPassword && password === '';
	
	$: disabled = Object.values(errors).some((e) => e) || emailPasswordFailed;

	async function checkAuth() {
		try {
			if (useEmailPassword) {
				await pb.collection('users').authWithPassword($profile.email, password);
			} else {
				await pb.collection('users').authWithOAuth2({ provider });
			}
			if (!pb.authStore.isValid) {
				errors.auth = `не удалось проверить ${$profile.provider} авторизацию`;
			}
		} catch (err) {
			errors.auth = err.message;
		}
	}
	async function changeNames() {
		try {
			await pb.collection('users').update($profile.id, {
				username,
				fullname
			});
			$profile.username = username;
			$profile.fullname = fullname;
		} catch (err) {
			for (let [key, data] of Object.entries(err.originalerrors.data.data)) {
				errors[key] = data.message;
			}
		}
	}
	async function changeEmail() {
		try {
			await pb.collection('users').requestEmailChange(email);
		} catch (err) {
			errors.email = err.message;
		}
	}
	async function change() {
		if (disabled) {
			return;
		}
		await checkAuth();
		if (disabled) {
			return;
		}
		if (username !== $profile.username || fullname !== $profile.fullname) {
			await changeNames();
			if (disabled) {
				return;
			}
		}
		if (email !== $profile.email) {
			await changeEmail();
			if (errors.email) {
				return;
			}
			emailChange = true;
		} else {
			$auth = null;
		}
	}
</script>

{#if emailChange}
	<div class="main menu item form">
		На почту <code>{email}</code> отправлено письмо. Перейдите туда, чтобы привязать ее к своему
		аккаунту, вместо старой <code>{$profile.email}</code>.
		<button class="link" on:click={() => ($auth = null)}>Вернуться в аккаунт?</button>
	</div>
{:else}
	<form class="main menu item form" on:submit|preventDefault={change}>
		<!-- username -->
		<div>
			<input
				class:failed={errors.username}
				placeholder="Логин"
				bind:value={username}
				on:keydown={() => delete errors.username}
				on:blur={() => {
					if (username === '') {
						username = $profile.username;
					}
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
		<!-- fullname -->
		<div>
			<input
				class:failed={errors.fullname}
				placeholder="Имя Фамилия"
				bind:value={fullname}
				on:keydown={() => delete errors.fullname}
				on:blur={() => {
					if (fullname !== '') {
						errors.fullname = checkFullname(fullname);
						if (!errors.fullname) {
							fullname = normFullname(fullname);
						}
					}
				}}
				id="fullname"
				type="text"
				name="fullname"
			/>
			{#if errors.fullname}
				<span class="failed">{errors.fullname}</span>
			{/if}
		</div>
		{#if useEmailPassword}
			<!-- email -->
			<div>
				<input
					autocomplete="off"
					class:failed={errors.email}
					placeholder="Email"
					bind:value={email}
					on:keydown={() => delete errors.email}
					on:blur={() => {
						if (email === '') {
							email = $profile.email;
						}
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
					autocomplete="off"
					class:failed={errors.password}
					placeholder="Пароль"
					bind:value={password}
					on:keydown={() => delete errors.password}
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
		{/if}
		<!-- submit -->
		<div>
			{#if errors.auth}
				<span class="failed">{errors.auth}</span>
			{/if}
			<button {disabled} type="submit">Обновить</button>
		</div>
		<!-- back -->
		<button class="link" on:click={() => ($auth = null)}>Вернуться в аккаунт?</button>
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

<script>
	import { pb, profile } from '$lib';
	import { auth } from '$lib/data/popup';
	import { checkEmail, checkPassword } from '$lib/algo/auth';
	import { dict } from '$lib/load/user';
	import { links, parseLogin, checkLogin } from '$lib/algo/link';

	let errors = {};
	let contacts = { ...$profile.contacts };

	let email = $profile.email;
	let password = '';
	let emailChange = false;

	const provider = dict.provider[$profile.provider];

	const useEmailPassword = $profile.provider === 0;
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
				errors.auth = `не удалось проверить ${provider} авторизацию`;
			}
		} catch (err) {
			errors.auth = err.message;
		}
	}

	async function changeContacts() {
		$profile.contacts = Object.keys(contacts).length > 0 ? contacts : null;

		await pb.collection('users').update($profile.id, {
			contacts: $profile.contacts
		});
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
		if (errors.auth) {
			return;
		}
		await changeContacts();
		if (disabled) {
			return;
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
		<!-- links -->
		{#each Object.entries(links) as [owner, link] (owner)}
			<div class="link">
				<img class="icon" src="/owners/{owner}.svg" alt={owner} />
				<input
					class:failed={errors[owner]}
					bind:value={contacts[owner]}
					placeholder={link}
					on:blur={() => {
						if (contacts[owner] === '') {
							delete contacts[owner];
						}
						if (contacts[owner]) {
							const { login, domain } = parseLogin(contacts[owner]);
							errors[owner] = checkLogin(login, domain, owner);
							if (!errors[owner]) {
								contacts[owner] = login;
							}
						}
					}}
					id={owner}
					type="text"
					name={owner}
				/>
			</div>
			{#if errors[owner]}
				<span class="failed">{errors[owner]}</span>
			{/if}
		{/each}
		<br />
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
			<button class="submit" {disabled} type="submit">Обновить</button>
		</div>
		<!-- back -->
		<button class="link" on:click={() => ($auth = 0)}>Вернуться в аккаунт?</button>
	</form>
{/if}

<style>
	div {
		display: flex;
		flex-direction: column;
	}
	div.link {
		flex-direction: row;
	}
	button.link {
		font-size: var(--font-0);
		align-self: flex-end;
	}
	button.submit {
		width: 100%;
	}
</style>

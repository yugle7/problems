<script>
	import { auth } from '$lib/data/popup';

	import Login from '$lib/view/Auth/Login.svelte';
	import SignUp from '$lib/view/Auth/SignUp.svelte';
	import Reset from '$lib/view/Auth/Reset.svelte';
	import Name from '$lib/view/Auth/Name.svelte';
	import Contacts from '$lib/view/Auth/Contacts.svelte';
	import Close from '$lib/view/icon/Close.svelte';
</script>

<Close action={() => ($auth = null)} />

{#if $auth === 'login'}
	<Login />
{:else if $auth === 'signup'}
	<SignUp />
{:else if $auth === 'reset'}
	<Reset />
{:else if $auth === 'name'}
	<Name />
{:else if $auth === 'contacts'}
	<Contacts />
{/if}

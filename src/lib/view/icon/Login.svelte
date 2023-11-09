<script>
	import { auth } from '$lib/data/popup';
</script>

<button class="link" on:click={() => ($auth = 'login')}>
	<img class="icon" src="/users/login.svg" alt="login" />
</button>

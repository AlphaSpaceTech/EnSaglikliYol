<script>
	import { goto } from '$app/navigation';

	const logIn = () => {
		goto('/auth');
	};
</script>

<h1>You need to verify your e-mail to log-in</h1>
<p>
	We have sent you an e-mail to verify your account. Please check your inbox and click the link to
	verify your account.
</p>
<button on:click={logIn}>Log-in</button>

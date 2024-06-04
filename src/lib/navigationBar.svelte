<script lang="ts">
	import { goto } from '$app/navigation';

	export let user: { email?: string };
	export let supabase: any; // Export supabase prop

	function handleUserClick() {
		goto('/private');
	}

	const logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
		}
	};
</script>

<nav class="navbar">
	<div class="logo"><img src="/favicon.png" class="favicon" alt="logo" /></div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-missing-attribute -->
	<a on:click={handleUserClick}>
		<h3>{user?.email}</h3>
	</a>
	<nav>
		<a href="/">Home</a>
	</nav>
	<button on:click={logout}>Logout</button>
</nav>

<style>
	.navbar {
		display: flex;
		justify-content: space-between;
		background-color: #517908a9;
		color: white;
		border-radius: 10px;
	}
	.logo {
		font-size: 1.5em;
	}
	.favicon {
		width: 100px;
		height: 100px;
	}
</style>

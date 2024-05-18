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
	<div class="logo">Logo</div>
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
		padding: 1em;
		background-color: #d8bdff;
		color: white;
	}
	.logo {
		font-size: 1.5em;
	}
	.user-icon {
		cursor: pointer;
	}
	.icon {
		height: 24px;
		width: 24px;
	}
</style>

<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	export let user: { email?: string };
	export let supabase: any; // Export supabase prop

	let isMenuOpen = false;
	function handleUserClick() {
		console.log(user);
		if (user === null) {
			goto('/auth');
			return;
		}
		isMenuOpen = !isMenuOpen;
	}

	const logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
		}
		invalidateAll();
	};
</script>

<nav class="navbar">
	<div class="logo"><img src="/favicon.png" class="favicon" alt="logo" /></div>
	<a href="/find">Find</a>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-missing-attribute -->
	<div class="user-menu">
		<a on:click={handleUserClick}>
			<h3 style="padding: 10px;">{user?.email}</h3>
		</a>
		{#if isMenuOpen}
			<div class="menu">
				<a href="/private">Profile</a>
				<a href="/settings">Settings</a>
				<button on:click={logout}>Logout</button>
			</div>
		{/if}
	</div>
</nav>

<style>
	.navbar {
		display: flex;
		justify-content: space-between;
		background-color: #517908a9;
		color: white;
		border-radius: 10px;
		position: relative;
	}
	.logo {
		font-size: 1.5em;
	}
	.favicon {
		width: 100px;
		height: 100px;
	}
	.user-menu {
		position: relative; /* Add this */
	}
	.menu {
		background-color: #517908a9;
		border-radius: 5px;
		padding: 10px;
		position: absolute; /* Add this */
		right: 0; /* Add this */
	}
</style>

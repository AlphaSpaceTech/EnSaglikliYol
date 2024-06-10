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

<nav>
	<div class="logo">
		<a href="/"><img src="/favicon.png" alt="7-Times Logo" /></a>
	</div>
	<h1>En Saglikli Yol</h1>
	<ul>
		<li><a href="/find">Find a hospital</a></li>
		{#if user === null}
			<li><a href="/auth">Log in</a></li>
		{:else}
			<li><a href="/appointments">Your Appointments</a></li>
			<button on:click={handleUserClick}>Your profile</button>
		{/if}
	</ul>
</nav>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-missing-attribute -->
<div class="user-menu">
	<a on:click={handleUserClick}> </a>
	{#if isMenuOpen}
		<div class="menu">
			<h3 style="padding: 10px;">{user?.email}</h3>
			<button on:click={logout}>Logout</button>
		</div>
	{/if}
</div>

<style>
	/* Roboto Font*/
	* {
		font-family: 'Roboto', sans-serif;
	}
	nav {
		background-color: rgb(56, 56, 56);
		display: flex;
		align-items: center;
		padding: 1rem;
	}
	nav img {
		border-radius: 10px;
		width: 100px;
		height: 100px;
		display: inline;
		margin-right: 30px;
		height: 100%;
		width: auto;
	}
	nav h1 {
		color: white;
		font-size: 2rem;
		font-weight: bold;
		text-align: center;
		background: rgb(255, 255, 255);
		/*make the text glow*/

		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin: 20px;
	}
	nav ul {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-left: auto;
	}
	nav ul li {
		list-style: none;
		margin: 0 1rem;
	}
	nav ul li a {
		color: white;
		text-decoration: none;
		font-size: 1.2rem;
		font-weight: bold;
		transition: all 0.3s ease-in-out;
		text-shadow:
			0 0 1px #ffffff00,
			0 0 2px #ffffff00,
			0 0 3px #00589200,
			0 0 4px #00589200,
			0 0 5px #00589200,
			0 0 6px #00589200,
			0 0 7px #00589200;
	}
	nav ul li a:hover {
		text-shadow:
			0 0 5px #ffffff6e,
			0 0 10px #ffffff6e,
			0 0 15px #ffffff6e,
			0 0 20px #0058926e,
			0 0 25px #0058926e,
			0 0 30px #0058926e,
			0 0 35px #0058926e;

		background-clip: text;
	}

	@keyframes breathe {
		0% {
			background-color: rgb(151, 255, 255);
		}
		25% {
			background-color: rgb(255, 0, 255);
		}
		50% {
			background-color: rgb(0, 255, 255);
		}
		75% {
			background-color: rgb(255, 188, 19);
		}
		100% {
			background-color: rgb(151, 255, 255);
		}
	}
	@media screen and (max-width: 600px) {
		nav {
			flex-direction: column;
			align-items: center;
		}
		nav img {
			width: 50px;
			height: 50px;
		}
		nav h1 {
			font-size: 1.5rem;
		}
		nav ul {
			flex-direction: column;
			align-items: center;
		}
		nav ul li {
			margin: 0.5rem 0;
		}
		nav ul li a {
			font-size: 1rem;
		}
	}
	.logo {
		width: 100px;
		height: 100px;
		position: relative;
		overflow: hidden;
		border-radius: 50%;
	}
	.user-menu {
		background-color: rgba(78, 194, 194, 0.589);
		border-radius: 20px;
		position: absolute; /* Add this */
		right: 0; /* Add this */
		margin: 10px;
	}
	.menu {
		padding: 10px;
		align-items: center;
	}
</style>

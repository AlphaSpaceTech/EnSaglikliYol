<svelte:head>
	<title>En Sağlıklı Yol</title>
</svelte:head>

<script>
	import { t, loadTranslations } from '$lib/translations';

	let selectedLanguage = 'tr'; // Default language
	loadTranslations(selectedLanguage);
	// Function to handle language change
	const changeLanguage = () => {
		loadTranslations(selectedLanguage);
	};
</script>

<main class="container">
	<h1>{$t('main.welcome')}</h1>
	<div class="buttons">
		<button><a href="/find">{$t('appointments.find_a_hospital')}</a></button>
		<button><a href="/appointments">{$t('main.appointments')}</a></button>
	</div>
</main>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 1em;
		background-color: #3b3b3b3f;
		border-radius: 5px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		height: 100%;
		text-align: center;
		margin: 10vh auto;
		max-width: 600px;
	}

	.buttons {
		display: flex;
		justify-content: space-between;
		width: 100%;
		max-width: 600px;
		margin-top: 2em;
	}

	button {
		flex-grow: 1;
		margin: 0.5em;
		padding: 0.5em 1em;
		border: none;
		border-radius: 4px;
		background-color: #007bff;
		color: white;
		cursor: pointer;
		transition: background-color 0.3s ease;
		text-decoration: none;
	}

	button:hover {
		background-color: #0056b3;
	}

	a {
		color: white;
		text-decoration: none;
	}
</style>

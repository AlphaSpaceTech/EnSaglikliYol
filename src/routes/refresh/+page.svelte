<svelte:head>
	<title>En Sağlıklı Yol - Refreshing</title>
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

<main>
	<h1>{$t('refresh.data')}</h1>
</main>

<style>
	h1 {
		text-align: center;
		padding: 0;
		margin: 0;
		color: white;
	}
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		padding: 0;
		margin: 0;
		animation: gradient 5s ease-in-out infinite;
		background: linear-gradient(270deg, #ff7a18, #af002d, #319197, #5f87ff);
		background-size: 800% 800%;
		width: 100%;
		height: 87vh;
	}

	@keyframes gradient {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
</style>

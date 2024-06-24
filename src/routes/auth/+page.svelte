<svelte:head>
	<title>En Sağlıklı Yol - Auth</title>
</svelte:head>

<script>
	import { t, loadTranslations } from '$lib/translations';
	let selectedLanguage = 'tr'; // Default language

	// Function to handle language change
	const changeLanguage = () => {
		loadTranslations(selectedLanguage);
	};
</script>

<form method="POST" action="?/login" class="container">
	<label class="dropdowns">
		{$t('auth.email')}
		<input name="email" type="email" />
	</label>
	<label class="dropdowns">
		{$t('auth.password')}
		<input name="password" type="password" />
	</label>
	<div class="bottomButtons">
		<button>{$t('auth.login')}</button>
		<button formaction="?/signup">{$t('auth.sign_up')}</button>
	</div>
</form>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 1em;
		background-color: #3b3b3b50;
		border-radius: 5px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		width: 100%;
		max-width: 600px;
		margin: auto;
		margin-top: 10em;
	}

	.dropdowns {
		width: 100%;
		padding: 1em;
		font-size: 16px;
		border-radius: 4px;
		background-color: #3b3b3b00;
		box-sizing: border-box;
	}

	.bottomButtons {
		display: flex;
		justify-content: space-between;
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

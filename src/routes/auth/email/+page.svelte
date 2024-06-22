<script>
	import { goto } from '$app/navigation';

	const logIn = () => {
		goto('/auth');
	};
	import { t, loadTranslations } from '$lib/translations';

	let selectedLanguage = 'en'; // Default language

	// Function to handle language change
	const changeLanguage = () => {
		loadTranslations(selectedLanguage);
	};
</script>

<h1>{$t('auth.verify')}</h1>
<p>
	{$t('auth.verification_message')}
</p>
<button on:click={logIn}>{$t('auth.login')}</button>

<script lang="ts">
	export let data;
	$: ({ doctors } = data);

	import { t, loadTranslations } from '$lib/translations';

	console.log(doctors);

	let selectedLanguage = 'en'; // Default language

	// Function to handle language change
	const changeLanguage = () => {
		loadTranslations(selectedLanguage);
	};
</script>

<h1>Welcome to Supabase! [Test]</h1>
<p>{$t('common.name')}</p>

<select bind:value={selectedLanguage} on:change={changeLanguage}>
	<option value="en">English</option>
	<option value="tr">Turkish</option>
	<!-- Add more options for other languages -->
</select>

<ul>
	{#each doctors as doctor}
		<li>{doctor.name}</li>
	{/each}
</ul>

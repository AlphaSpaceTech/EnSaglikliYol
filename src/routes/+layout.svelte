<script>
	import { goto, invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import NavigationBar from '$lib/navigationBar.svelte';
	import { loadTranslations } from '$lib/translations';
	import { inject } from '@vercel/analytics';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { dev } from '$app/environment';

	let selectedLanguage = 'tr'; // Default language

	// Function to handle language change
	const changeLanguage = () => {
		if (selectedLanguage === 'en') {
			selectedLanguage = 'tr';
		} else {
			selectedLanguage = 'en';
		}
		loadTranslations(selectedLanguage);
	};

	export let data;
	$: ({ session, supabase, user } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (!newSession) {
				/**
				 * Queue this as a task so the navigation won't prevent the
				 * triggering function from completing
				 */
				setTimeout(() => {}, 0);
			}
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
	inject({ mode: dev ? 'development' : 'production' });
	injectSpeedInsights();
	loadTranslations(selectedLanguage);
</script>

<NavigationBar {user} {supabase} />
<slot />

{#if selectedLanguage == 'tr'}
	<button on:click={changeLanguage} class="changeLanguage">Change Language</button>
{:else}
	<button on:click={changeLanguage} class="changeLanguage">Dil Değiştir</button>
{/if}

<style>
	.changeLanguage {
		position: fixed;
		bottom: 0;
		right: 0;
	}
</style>

<script>
	import { goto, invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import NavigationBar from '$lib/navigationBar.svelte';
	import { loadTranslations } from '$lib/translations';
	import { inject } from '@vercel/analytics';
	import { dev } from '$app/environment';

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
</script>

<NavigationBar {user} {supabase} />
<slot />

<script lang="ts">
	import { onMount } from 'svelte';
	export let data;
	$: ({ hospitals, userID, supabase, appointments } = data);

	onMount(() => {
		console.log(appointments);
		console.log(hospitals);
	});
</script>

{#each appointments as appointment}
	<h2>appointments for {userID.user?.email}</h2>
	<h3>{appointment.created_at}</h3>
	<h4>{hospitals[appointment.hospital_id - 1].name}</h4>
{/each}

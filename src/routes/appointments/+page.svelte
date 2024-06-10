<script lang="ts">
	import { applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	export let data;
	$: ({ hospitals, userID, supabase, appointments } = data);

	let deleteSelected: any;
	let thisPage;

	async function deleteAppointment(id: any) {
		const { error } = await supabase.from('appointments').delete().eq('id', id);
		goto('/').then(() => goto(thisPage));
	}

	onMount(() => {
		thisPage = window.location.pathname;
		console.log(appointments);
		console.log(hospitals);
	});
</script>

<h2>Appointments for {userID.user?.email}</h2>
{#each appointments as appointment}
	<h3>{appointment.created_at}</h3>
	<h4>{hospitals[appointment.hospital_id - 1].name}</h4>
	<h4>{appointment.booked_for}</h4>
	<button on:click={() => deleteAppointment(appointment.id)}>Delete this appointment</button>
{/each}

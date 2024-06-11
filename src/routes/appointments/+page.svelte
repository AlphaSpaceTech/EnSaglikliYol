<script lang="ts">
	import { applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	export let data;
	$: ({ hospitals, userID, supabase, appointments } = data);

	let deleteSelected: any;
	let thisPage: any;

	async function deleteAppointment(id: any) {
		const { error } = await supabase.from('appointments').delete().eq('id', id);
		goto('/').then(() => goto(thisPage));
	}

	function gotoHospital(hospital_id: any) {
		goto(`/hospital/${hospital_id}`);
	}
	onMount(() => {
		if (userID.user?.aud == null) {
			goto('/auth');
		}
		thisPage = window.location.pathname;
		console.log(appointments);
		console.log(hospitals);
	});
</script>

<main class="container">
	<h2 class="title">Appointments for {userID.user?.email}</h2>
	{#if appointments.length === 0}
		<h3>No appointments found</h3>
		<button on:click={() => goto('/find')}>Find a hospital</button>
	{/if}
	{#each appointments as appointment}
		<div class="appointmentCard">
			<h2>{hospitals[appointment.hospital_id - 1].name}</h2>
			<h3>Booked for: {appointment.booked_for}</h3>
			<h4>Created at: {appointment.created_at}</h4>
			<button class="deleteButton" on:click={() => deleteAppointment(appointment.id)}
				>Delete this appointment</button
			>
			<button class="detailsButton" on:click={() => gotoHospital(appointment.hospital_id)}
				>Details for this hospital</button
			>
		</div>
	{/each}
</main>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 1em;
		background-color: #f9f9f9;
		border-radius: 5px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	}

	.title {
		margin-bottom: 1em;
	}

	.appointmentCard {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		padding: 1em;
		background-color: #fff;
		border-radius: 4px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		margin-bottom: 1em;
	}

	.deleteButton {
		padding: 0.5em 1em;
		border: none;
		border-radius: 4px;
		background-color: #007bff;
		color: white;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	.deleteButton:hover {
		background-color: #0056b3;
	}
</style>

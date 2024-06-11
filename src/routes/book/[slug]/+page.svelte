<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { DateInput } from 'date-picker-svelte';
	export let data;
	$: ({ hospitals, userID, supabase, appointments } = data);

	const hospitalID = $page.params.slug;
	let date = new Date();

	async function bookAppointment() {
		const { data, error } = await supabase
			.from('appointments')
			.insert([
				{
					hospital_id: hospitalID,
					uid: userID.user?.id,
					booked_for: date
				}
			])
			.select();
		goto('/appointments');
		console.log(hospitalID);
		console.log(userID.user?.id);
	}
	onMount(() => {
		if (userID.user?.aud == null) {
			goto('/auth');
		}
	});
</script>

<main>
	<section class="appointmentContainer">
		<section class="hero">
			<h1>Booking an appointment with {hospitals[Number(hospitalID) - 1].name}</h1>
		</section>
		<div class="dateInput">
			<label for="date">Select a date for your appointment</label>
			<DateInput bind:value={date} />
		</div>
		<button on:click={bookAppointment}>Book Appointment</button>
	</section>
</main>

<style>
	main {
		max-width: 800px;
		margin: 0 auto;
		padding: 1em;
	}

	.hero {
		color: rgb(0, 0, 0);
		padding: 2em;
		border-radius: 4px;
		text-align: center;
		margin-bottom: 2em;
	}

	.appointmentContainer {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		padding: 1em;
		background-color: #f5f5f5;
		border-radius: 4px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.appointmentContainer .dateInput {
		margin-bottom: 1em;
		padding: 0.5em;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	.appointmentContainer button {
		padding: 0.5em 1em;
		border: none;
		border-radius: 4px;
		background-color: #007bff;
		color: white;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	.appointmentContainer button:hover {
		background-color: #0056b3;
	}
</style>

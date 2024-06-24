<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { DateInput } from 'date-picker-svelte';
	import { t, loadTranslations } from '$lib/translations';
	export let data;
	$: ({ hospitals, userID, supabase, doctors } = data);

	let selectedLanguage = 'tr'; // Default language
	loadTranslations(selectedLanguage);

	// Function to handle language change
	const changeLanguage = () => {
		loadTranslations(selectedLanguage);
	};

	const hospitalID = $page.params.slug;
	let date = new Date();
	let hospitalDoctors: any;
	let doctorID: any;

	async function bookAppointment() {
		const { data, error } = await supabase
			.from('appointments')
			.insert([
				{
					hospital_id: hospitalID,
					uid: userID.user?.id,
					booked_for: date,
					doctor_id: doctorID
				}
			])
			.select();
		goto('/appointments');
		console.log(hospitalID);
		console.log(userID.user?.id);
		console.log(doctorID);
	}
	onMount(() => {
		if (userID.user?.aud == null) {
			goto('/auth');
		}
		hospitalDoctors = doctors.filter((doc) => doc.hospital_id == hospitalID);
	});
</script>

<main>
	<section class="appointmentContainer">
		<section class="hero">
			<h1>{$t('book.book_with')} {hospitals[Number(hospitalID) - 1].name}</h1>
		</section>
		<div class="inputs">
			<div class="dateInput">
				<label for="date">{$t('book.select_date')}</label>
				<DateInput
					bind:value={date}
					min={new Date()}
					max={new Date(new Date().setFullYear(new Date().getFullYear() + 2))}
				/>
				<div class="doctorInput">
					<label for="doctor">{$t('book.select_doctor')}</label>
					<select name="doctor" id="doctor" bind:value={doctorID}>
						{#if hospitalDoctors !== undefined}
							{#each hospitalDoctors as doctor}
								<option value={doctor.id}>{doctor.name}</option>
							{/each}
						{:else}
							<option value="0">{$t('book.no_doctors')}</option>
						{/if}
					</select>
				</div>
			</div>
		</div>
		<button on:click={bookAppointment}>{$t('book.book')}</button>
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
	.inputs {
		display: flex;
		flex-direction: column;
		gap: 1em;
		padding: 1em;
	}

	.doctorInput {
		padding-top: 1em;
	}
</style>

<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	export let data;
	$: ({ hospitals, userID, supabase, appointments } = data);

	const hospitalID = $page.params.slug;

	async function bookAppointment() {
		const { data, error } = await supabase
			.from('appointments')
			.insert([
				{
					hospital_id: hospitalID,
					uid: userID.user?.id
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

<h1>Booking an appointment with {hospitals[Number(hospitalID) - 1].name} ({hospitalID})</h1>
<button on:click={bookAppointment}>Book now</button>

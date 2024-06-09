<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	export let data;
	$: ({ cities, provinces, hospitals, reviews } = data);

	const hospitalID = $page.params.slug;

	let hospitalName: String;
	let hospitalCityText: String;
	let hospitalProvinceText: String;
	let hospitalCordsLatitude: Number;
	let hospitalCordsLongitude: Number;
	let hospitalContactNumber: Number;

	function sendToBooking() {
		goto('/book/' + hospitalID);
	}

	onMount(() => {
		hospitalName = hospitals[Number(hospitalID) - 1].name;
		hospitalCityText = cities[hospitals[Number(hospitalID) - 1].city_id - 1].name;
		hospitalProvinceText = provinces[hospitals[Number(hospitalID) - 1].province_id - 1].name;
		hospitalCordsLatitude = hospitals[Number(hospitalID) - 1].latitude;
		hospitalCordsLongitude = hospitals[Number(hospitalID) - 1].longitude;
		hospitalContactNumber = hospitals[Number(hospitalID) - 1].telephone;
		console.log(hospitalName);
		console.log(hospitalCityText);
		console.log(hospitalProvinceText);
	});
</script>

<h1>{hospitalName}</h1>
<h2>At {hospitalProvinceText}/{hospitalCityText}</h2>
<h2>Cords: {hospitalCordsLatitude} - {hospitalCordsLongitude}</h2>
<h2>Contact number: {hospitalContactNumber}</h2>
<button on:click={sendToBooking}>Book an appointment</button>

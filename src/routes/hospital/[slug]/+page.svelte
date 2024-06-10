<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	export let data;
	$: ({ cities, provinces, hospitals, reviews, attractions } = data);

	const hospitalID = $page.params.slug;

	let hospitalName: String;
	let hospitalCityText: String;
	let hospitalProvinceText: String;
	let hospitalCordsLatitude: Number;
	let hospitalCordsLongitude: Number;
	let hospitalContactNumber: Number;
	let relatedAttractionsCity: any;
	let relatedAttractionsProvince: any;
	let load: boolean = false;

	function sendToBooking() {
		goto('/book/' + hospitalID);
	}

	onMount(() => {
		console.log(attractions);
		hospitalName = hospitals[Number(hospitalID) - 1].name;
		hospitalCityText = cities[hospitals[Number(hospitalID) - 1].city_id - 1].name;
		hospitalProvinceText = provinces[hospitals[Number(hospitalID) - 1].province_id - 1].name;
		hospitalCordsLatitude = hospitals[Number(hospitalID) - 1].latitude;
		hospitalCordsLongitude = hospitals[Number(hospitalID) - 1].longitude;
		hospitalContactNumber = hospitals[Number(hospitalID) - 1].telephone;
		relatedAttractionsCity = attractions.filter(
			(att) => att.city_id === cities[hospitals[Number(hospitalID) - 1].city_id].id - 1
		);
		relatedAttractionsProvince = attractions.filter(
			(att2) => att2.province_id === provinces[hospitals[Number(hospitalID) - 1].province_id - 1].id
		);
		console.log(hospitalName);
		console.log(hospitalCityText);
		console.log(hospitalProvinceText);
		console.log(relatedAttractionsCity);
		console.log(relatedAttractionsProvince);
		console.log(provinces[hospitals[Number(hospitalID) - 1].province_id - 1]);
		load = true;
	});
</script>

<h1>{hospitalName}</h1>
<h2>At {hospitalProvinceText}/{hospitalCityText}</h2>
<h2>Cords: {hospitalCordsLatitude} - {hospitalCordsLongitude}</h2>
<h2>Contact number: {hospitalContactNumber}</h2>
<button on:click={sendToBooking}>Book an appointment</button>

<div>
	{#if load}
		<h4>Places you can visit in {hospitalProvinceText}/{hospitalCityText}</h4>
		{#each relatedAttractionsProvince as attractProv}
			{attractProv.name}
			<img src={attractProv.image} alt={attractProv.name} />
		{/each}
		<h4>Places you can visit in {hospitalCityText}</h4>
		{#each relatedAttractionsCity as attractCity}
			{attractCity.name}
			<img src={attractCity.image} alt={attractCity.name} />
		{/each}
	{/if}
</div>

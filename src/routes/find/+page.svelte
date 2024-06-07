<script lang="ts">
	import { onMount } from 'svelte';
	export let data;
	$: ({ cities, provinces, hospitals } = data);
	let selectedCity: String; // Variable to store the selected city
	let cityOrder: number;
	let province: any;
	let selectedProvince: String; // Variable to store the selected province
	let provinceOrder: number;
	let hospital: any;
	let selectedHospital: String; // Variable to store the selected hospital
	let hospitalOrder: number;
	let hospitalCordsLatitude: any;
	let hospitalCordsLongitude: any;

	// Function to handle city change
	const changeCity = () => {
		console.log('Selected city:', selectedCity);
		cityOrder = cities.findIndex((city) => city.name === selectedCity) + 1;
		console.log('City order:', cityOrder);
		//Get all provinces that have the selected city and print province name
		province = provinces.filter((province) => province.city_id === cityOrder);
		console.log('Province:', province);
	};
	// Function to handle province change
	const changeProvince = () => {
		console.log('Selected province:', selectedProvince);
		//Province order in all provinces
		provinceOrder = provinces.findIndex((prov) => prov.name === selectedProvince) + 1;
		console.log('Province order:', provinceOrder);
		//Get all hospitals that have the selected province and print hospital name
		hospital = hospitals.filter((hospital) => hospital.province_id === provinceOrder);
		console.log('Hospital:', hospital);
	};
	const changeHospital = () => {
		console.log('Selected hospital:', selectedHospital);
		hospitalOrder = hospitals.findIndex((hosp) => hosp.name === selectedHospital) + 1;
		console.log('Hospital order:', hospitalOrder);
		hospitalCordsLatitude = hospitals[hospitalOrder].latitude;
		hospitalCordsLongitude = hospitals[hospitalOrder].longitude;
		console.log('Hospital cords:', hospitalCordsLatitude, hospitalCordsLongitude);
	};
	onMount(() => {
		console.log('Cities:', cities);
		console.log('Provinces:', provinces);
		console.log('Hospitals:', hospitals);
	});
</script>

<select bind:value={selectedCity} on:change={changeCity}>
	<option disabled selected>Select a city</option>
	{#each cities as city}
		<option value={city.name}>{city.name}</option>
	{/each}
</select>

{#if province}
	<select bind:value={selectedProvince} on:change={changeProvince}>
		<option disabled selected>Select a province</option>
		{#each province as prov}
			<option value={prov.name}>{prov.name}</option>
		{/each}
	</select>
{/if}

{#if hospital}
	<select bind:value={selectedHospital} on:change={changeHospital}>
		<option disabled selected>Select a hospital</option>
		{#each hospital as hosp}
			<option value={hosp.name}>{hosp.name}</option>
		{/each}
	</select>
{/if}

<!-- Google maps view--  <iframe
 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.073013073073!2d106.8272563147697!3d-6.175392995504668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f4f1b6d7b1e7%3A0x2e69f4f1b6d7b1e7!2sJakarta!5e0!3m2!1sen!2sid!4v1626823660734!5m2!1sen!2sid"
 width="600"
 height="450"
 style="border:0;"
 allowfullscreen=""
 loading="lazy"
></iframe>
> with cords-->
{#if hospitalCordsLatitude && hospitalCordsLongitude}
	<div style="width: 100%">
		<iframe
			width="100%"
			height="600"
			frameborder="0"
			scrolling="no"
			marginheight="0"
			marginwidth="0"
			src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q={hospitalCordsLatitude},%20{hospitalCordsLongitude}&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
		></iframe>
	</div>{/if}

<script lang="ts">
	import { onMount } from 'svelte';
	export let data;
	$: ({ cities, cityId, provinces, hospitals } = data);
	let selectedCity: String; // Variable to store the selected city
	let cityOrder: number;
	let province: any;

	// Function to handle city change
	const changeCity = () => {
		console.log('Selected city:', selectedCity);
		cityOrder = cities.findIndex((city) => city.name === selectedCity) + 1;
		console.log('City order:', cityOrder);
		//Get all provinces that have the selected city and print province name
		province = provinces.filter((province) => province.city_id === cityOrder);
		console.log('Province:', province);
	};
	onMount(() => {
		console.log('CityID:', cityId);
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
	{#each province as prov}
		<p>{prov.name}</p>
	{/each}
{/if}

{#if hospitals}
	{#each hospitals as hospital}
		<p>{hospital.name}</p>
	{/each}
{/if}



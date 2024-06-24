<svelte:head>
	<title>En Sağlıklı Yol - Hospital</title>
</svelte:head>

<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { t, loadTranslations } from '$lib/translations';
	export let data;
	$: ({ cities, provinces, hospitals, reviews, attractions, supabase, userID, doctors } = data);

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
	let review: any;
	let reviewTitle: String;
	let reviewComment: string;
	let thisPage: any;
	let hospitalDoctors: any;

	let branchMap = [
		['Kadın Hastalıkları ve Doğum Anabilim Dalı'],
		['Genel Cerrahi Anabilim Dalı'],
		['Fizik Tedavi ve Rehabilitasyon Anabilim Dalı'],
		['Göz Hastalıkları Anabilim Dalı'],
		['Kulak Burun Boğaz Hastalıkları Anabilim Dalı'],
		['Ortopedi ve Travmatoloji Anabilim Dalı'],
		['Ağız Diş ve Çene Cerrahisi']
	];

	let selectedLanguage = 'tr'; // Default language
	loadTranslations(selectedLanguage);

	// Function to handle language change
	const changeLanguage = () => {
		loadTranslations(selectedLanguage);
	};

	function sendToBooking() {
		goto('/book/' + hospitalID);
	}
	async function sendReview() {
		//TODO: Add points system
		if (reviewTitle !== undefined && reviewComment !== undefined) {
			const { data, error } = await supabase
				.from('user_reviews')
				.insert([
					{
						title: reviewTitle,
						data: reviewComment,
						hospital_id: hospitalID,
						user_id: userID.user?.id
					}
				])
				.select();
			goto('/refresh').then(() => goto(thisPage));
		} else {
			console.log('Null data');
		}
	}

	async function deleteReview(reviewId) {
		const { data, error } = await supabase.from('user_reviews').delete().eq('id', reviewId);

		if (error) {
			console.error('Error deleting review:', error);
		} else {
			// Refresh the page or update the state to remove the deleted review
			goto('/refresh').then(() => goto(thisPage));
		}
	}

	onMount(() => {
		hospitalDoctors = doctors.filter((doc) => doc.hospital_id == hospitalID);
		//if hospital doctors are =  [] then hospitaldoctors = undefined
		if (hospitalDoctors.length == 0) {
			hospitalDoctors = undefined;
		}
		thisPage = window.location.pathname;
		console.log(attractions);
		console.log(doctors);
		console.log(hospitalID);
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
		if (relatedAttractionsCity.length == 0) {
			relatedAttractionsCity = undefined;
		}
		if (relatedAttractionsProvince.length == 0) {
			relatedAttractionsProvince = undefined;
		}
		console.log(hospitalDoctors);
		console.log(hospitalName);
		console.log(hospitalCityText);
		console.log(hospitalProvinceText);
		console.log(relatedAttractionsCity);
		console.log(relatedAttractionsProvince);
		console.log(provinces[hospitals[Number(hospitalID) - 1].province_id - 1]);
		review = reviews.filter((review) => review.hospital_id == hospitalID);
		load = true;
	});
</script>

<div class="topPart">
	<div class="details">
		<h1>{hospitalName}</h1>
		<h2>{$t('hospital.at')} {hospitalProvinceText}/{hospitalCityText}</h2>
		<h2>{$t('hospital.cords')} {hospitalCordsLatitude} - {hospitalCordsLongitude}</h2>
		<h2>{$t('hospital.contact')} {hospitalContactNumber}</h2>
	</div>
	{#if hospitalCordsLatitude && hospitalCordsLongitude}
		<div class="mapContainer">
			<iframe
				frameborder="0"
				scrolling="no"
				marginheight="0"
				marginwidth="0"
				title="google-map-view"
				loading="lazy"
				class="map"
				src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q={hospitalCordsLatitude},%20{hospitalCordsLongitude}&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
			></iframe>
		</div>
	{/if}
</div>
<!-- svelte-ignore empty-block -->
{#if hospitalDoctors == undefined}{:else}
	<h2 style="margin: 1m; padding: 1em;">{$t('hospital.doctors_available')}</h2>
	<div class="doctors">
		{#each hospitalDoctors as doc}
			<div class="doctor">
				<h2>{doc.name}</h2>
				<h4>{branchMap[doc.branch]}</h4>
			</div>
		{/each}
	</div>
{/if}
<div class="reviews">
	<div class="review">
		{#if review === undefined}
			<h3>No reviews yet</h3>
		{:else}
			<div class="aReview">
				{#each review as revi}
					<div class="reviewContent">
						<div>
							<h2>{revi.title}</h2>
							<h4>{$t('review.from')} {revi.user_id}</h4>
							<p>{revi.data}</p>
						</div>
						{#if revi.user_id === userID.user?.id}
							<button on:click={() => deleteReview(revi.id)} class="deleteButton"
								>{$t('review.delete')}</button
							>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</div>
	<div class="reviewInput">
		<input bind:value={reviewTitle} placeholder={$t('review.title')} />
		<input bind:value={reviewComment} placeholder={$t('review.data')} />
		<div class="bottomButtons">
			<button on:click={sendReview}>{$t('review.send')}</button>
			<button on:click={sendToBooking}>{$t('find.book')}</button>
		</div>
	</div>
</div>

<div class="placesContainer">
	{#if load}
		{#if relatedAttractionsProvince == undefined}
			<h4>{$t('hospital.no_attraction')} {hospitalProvinceText}</h4>
		{:else}
			<div class="containerProvinces">
				<h4>{$t('hospital.places_visit')} {hospitalProvinceText}/{hospitalCityText}</h4>
				<div class="provincePlaces">
					{#each relatedAttractionsProvince as attractProv}
						{attractProv.name}
						<img src={attractProv.image} alt={attractProv.name} />
					{/each}
				</div>
			</div>
		{/if}
		<div class="containerCities">
			<h4>{$t('hospital.places_visit')} {hospitalCityText}</h4>
			<div class="cityPlaces">
				{#each relatedAttractionsCity as attractCity}
					{attractCity.name}
					<img src={attractCity.image} alt={attractCity.name} />
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.topPart {
		display: flex;
		align-items: stretch;
		padding: 1em;
		background-color: #3b3b3b3f;
		border-radius: 4px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}
	.topPart .details {
		flex: 1 0 60%; /* Adjust this to change the width of the details section */
	}

	.topPart .mapContainer {
		flex: 1 0 35%; /* Adjust this to change the width of the map section */
		margin-left: 10px;
	}

	.topPart .map {
		height: 100%;
		width: 100%;
	}

	.topPart h1 {
		color: #333;
		font-size: 2em;
		margin-bottom: 0.5em;
	}

	.topPart h2 {
		color: #666;
		margin-bottom: 0.5em;
	}

	.doctors {
		display: grid;
		grid-template-columns: repeat(3, 1fr); /* This creates three columns */
		gap: 1em;
		padding: 1em;
		border: 1px solid #ccc;
		border-radius: 4px;
	}
	.reviewContent {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.reviewInput {
		display: flex;
		flex-direction: column;
		padding: 0 0.5em;
		gap: 0.5em;
	}

	.reviewInput input {
		padding: 0.5em;
		border: 1px solid #ccc;
		border-radius: 4px;
	}
	.deleteButton {
		margin-right: 5em;
	}

	.bottomButtons {
		display: flex;
		justify-content: space-between; /* This will spread out the buttons */
	}

	.bottomButtons button {
		flex-grow: 1; /* This will make the buttons grow to fill the container */
		margin: 0.5em; /* This will create some space between the buttons */
		padding: 0.5em 1em;
		border: none;
		border-radius: 4px;
		background-color: #007bff;
		color: white;
		cursor: pointer;
		text-align: center; /* This will center the text inside the buttons */
		transition: background-color 0.3s ease;
	}
	.bottomButtons button:hover {
		background-color: #0056b3;
	}
	button {
		padding: 0.5em 1em;
		border: none;
		border-radius: 4px;
		background-color: #007bff;
		color: white;
		cursor: pointer;
	}
	.placesContainer {
		display: flex;
		justify-content: space-between;
		gap: 1em; /* Adjust this value to increase or decrease the gap */
	}
	.placesContainer h4 {
		/* make it like a title */
		margin: 0;
		padding: 0;
		color: #333;
	}

	.provincePlaces,
	.cityPlaces {
		display: grid;
		grid-template-columns: repeat(
			auto-fill,
			minmax(200px, 1fr)
		); /* Adjust the 200px to change the minimum width of the elements */
		gap: 0.5em;
		padding: 0.5em;
		border: 1px solid #ccc;
		border-radius: 4px;
		width: 45%;
	}
	.provincePlaces img,
	.cityPlaces img {
		width: 100%;
		height: auto;
		object-fit: cover;
	}

	@media (max-width: 600px) {
		.provincePlaces,
		.cityPlaces {
			width: 90%;
		}
	}

	@media (min-width: 601px) {
		.placesContainer {
			display: flex;
			justify-content: space-between;
		}
	}
	.reviews {
		display: grid;
		gap: 1em;
		padding: 1em;
		border: 1px solid #ccc;
		border-radius: 4px;
	}
</style>

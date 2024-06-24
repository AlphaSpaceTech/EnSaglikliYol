<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { t, loadTranslations } from '$lib/translations';
	export let data;
	$: ({ cities, provinces, hospitals, userID, reviews, supabase } = data);
	let selectedCity: String; // Variable to store the selected city
	let cityOrder: number;
	let province: any;
	let selectedProvince: any; // Variable to store the selected province
	let provinceOrder: number;
	let hospital: any;
	let selectedHospital: any; // Variable to store the selected hospital
	let hospitalOrder: number;
	let hospitalCordsLatitude: any;
	let hospitalCordsLongitude: any;
	let review: any;
	let reviewTitle: String;
	let reviewComment: string;
	let choiceStatus: string = $t('find.choice_1');
	let thisPage: any;

	let selectedLanguage = 'tr'; // Default language
	loadTranslations(selectedLanguage);

	// Function to handle language change
	const changeLanguage = () => {
		loadTranslations(selectedLanguage);
	};

	// Function to handle city change
	const changeCity = () => {
		console.log('Selected city:', selectedCity);
		cityOrder = cities.findIndex((city: any) => city.name === selectedCity) + 1;
		console.log('City order:', cityOrder);
		//Get all provinces that have the selected city and print province name
		province = provinces.filter((province: any) => province.city_id === cityOrder);
		console.log('Province:', province);
		selectedProvince = null;
		choiceStatus = $t('find.choice_2');
	};
	// Function to handle province change
	const changeProvince = () => {
		console.log('Selected province:', selectedProvince);
		//Province order in all provinces
		provinceOrder = provinces.findIndex((prov: any) => prov.name === selectedProvince) + 1;
		console.log('Province order:', provinceOrder);
		//Get all hospitals that have the selected province and print hospital name
		hospital = hospitals.filter((hospital: any) => hospital.province_id === provinceOrder);
		console.log('Hospital:', hospital);
		selectedHospital = null;
		choiceStatus = $t('find.choice_3');
	};
	const changeHospital = () => {
		console.log('Selected hospital:', selectedHospital);
		hospitalOrder = hospitals.findIndex((hosp: any) => hosp.name === selectedHospital) + 1;
		console.log('Hospital order:', hospitalOrder);
		hospitalCordsLatitude = hospitals[hospitalOrder].latitude;
		hospitalCordsLongitude = hospitals[hospitalOrder].longitude;
		console.log('Hospital cords:', hospitalCordsLatitude, hospitalCordsLongitude);
		//Get all review that have the selected hospital
		review = reviews.filter((review: any) => review.hospital_id == hospitalOrder);
		console.log(review);
		choiceStatus = '';
	};

	async function sendReview() {
		//TODO: Add points system
		if (reviewTitle !== undefined && reviewComment !== undefined) {
			const { data, error } = await supabase
				.from('user_reviews')
				.insert([
					{
						title: reviewTitle,
						data: reviewComment,
						hospital_id: hospitalOrder,
						user_id: userID.user?.id
					}
				])
				.select();
			goto('/refresh').then(() => goto(thisPage));
		} else {
			console.log('Null data');
		}
	}

	function sendToBooking() {
		goto('/book/' + hospitalOrder);
	}
	function sendToHospital() {
		goto('/hospital/' + hospitalOrder);
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
		thisPage = window.location.pathname;
		if (userID.user?.aud == null) {
			goto('/auth');
		}
		console.log('Cities:', cities);
		console.log('Provinces:', provinces);
		console.log('Hospitals:', hospitals);
		console.log(userID);
		console.log(reviews);
	});
</script>

<div class="all">
	<div class="dropdowns">
		<select bind:value={selectedCity} on:change={changeCity}>
			<option disabled selected>{$t('find.select_city')}</option>
			{#each cities as city}
				<option value={city.name}>{city.name}</option>
			{/each}
		</select>
		{#if province}
			<select bind:value={selectedProvince} on:change={changeProvince}>
				<option disabled selected>{$t('find.select_province')}</option>
				{#each province as prov}
					<option value={prov.name}>{prov.name}</option>
				{/each}
			</select>
		{/if}
		{#if hospital}
			<select bind:value={selectedHospital} on:change={changeHospital} class="hospital">
				<option disabled selected>{$t('find.select_hospital')}</option>
				{#each hospital as hosp}
					<option value={hosp.name}>{hosp.name}</option>
				{/each}
			</select>
		{/if}
		<h1>{choiceStatus}</h1>
		{#if hospitalCordsLatitude && hospitalCordsLongitude}
			<div style="width: 100%;height: 80%; margins: 10px;">
				<iframe
					height="100%"
					width="100%"
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
		<div class="container">
			<div class="reviews">
				{#if review.length !== 0}
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
				{/if}
				<div class="reviewInput">
					<input bind:value={reviewTitle} placeholder={$t('review.title')} />
					<input bind:value={reviewComment} placeholder={$t('review.data')} />
				</div>
				<div class="bottomButtons">
					<button on:click={sendReview}>{$t('review.send')}</button>
					<button on:click={sendToHospital}>{$t('find.details')}</button>
					<button on:click={sendToBooking}>{$t('find.book')}</button>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.map {
		width: 100%;
		height: 400px;
		object-fit: cover;
	}

	.dropdowns {
		width: 100%;
		padding: 1em;
		font-size: 16px;
		border-radius: 4px;
		background-color: #f9f9f9;
		box-sizing: border-box;
	}
	@media (max-width: 600px) {
		.dropdowns {
			width: 90%;
		}
	}

	.container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 1em;
		background-color: #f9f9f9;
		border-radius: 5px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	}
	select {
		width: 100%;
		padding: 0.5em;
		margin-bottom: 10px;
		font-size: 1em;
		border: 1px solid #ccc;
		border-radius: 4px;
		background-color: #f9f9f9;
		box-sizing: border-box;
		transition: all 0.3s ease;
	}

	select:hover {
		border-color: #888;
	}

	select:focus {
		outline: none;
		border-color: #007bff;
	}

	@media (max-width: 600px) {
		select {
			width: 90%;
		}
	}
	select {
		width: 100%;
		padding: 0.5em;
		font-size: 1em;
		border-radius: 4px;
		background-color: #f9f9f9;
		box-sizing: border-box;
		transition: all 0.3s ease;
	}

	select:hover {
		border-color: #888;
	}

	select:focus {
		outline: none;
		border-color: #007bff;
	}

	@media (max-width: 600px) {
		select {
			width: 90%;
		}
	}
	.reviews {
		margin-bottom: 1em;
	}

	.reviews h2,
	.reviews h4 {
		margin: 0.5em 0;
	}

	.reviews p {
		margin-bottom: 1em;
		color: #666;
	}

	.reviewInput {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}

	.reviewInput input {
		padding: 0.5em;
		border: 1px solid #ccc;
		border-radius: 4px;
	}
	.reviewContent {
		display: flex;
		justify-content: space-between;
		align-items: center;
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
</style>

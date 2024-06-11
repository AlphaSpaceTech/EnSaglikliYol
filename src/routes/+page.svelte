<script>
</script>

<main class="container">
	<h1>Welcome to En Saglikli Yol</h1>
	<div class="buttons">
		<button><a href="/find">Find a hospital</a></button>
		<button><a href="/appointments">See your appointments</a></button>
	</div>
</main>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 1em;
		background-color: #f9f9f9;
		border-radius: 5px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		height: 100%;
		text-align: center;
		margin: 10vh auto;
	}

	.buttons {
		display: flex;
		justify-content: space-between;
		width: 100%;
		max-width: 600px;
		margin-top: 2em;
	}

	button {
		flex-grow: 1;
		margin: 0.5em;
		padding: 0.5em 1em;
		border: none;
		border-radius: 4px;
		background-color: #007bff;
		color: white;
		cursor: pointer;
		transition: background-color 0.3s ease;
		text-decoration: none;
	}

	button:hover {
		background-color: #0056b3;
	}

	a {
		color: white;
		text-decoration: none;
	}
</style>

<script>
	import '../app.css';
	import { toastQueue } from '../stores';
</script>

<nav class="container mx-auto navbar bg-base-100">
	<div class="navbar-start">
		<a class="normal-case text-xl" href="/">Teen Patti</a>
	</div>
	<div class="navbar-end">
		<a
			class="mr-4 link link-hover"
			href="https://github.com/mustafa-kapadia1483/teen-patti"
			target="_blank"
			rel="noreferrer">Github</a
		>
		<a href="/create-room" class="btn btn-primary">Join / Create Room</a>
	</div>
</nav>

<main class="container mx-auto px-2">
	<slot />
	<div class="toast">
		{#each $toastQueue as { message, type }}
			<div
				class="alert"
				class:alert-error={type === 'error'}
				class:alert-info={type === 'info'}
				class:alert-success={type === 'success'}
			>
				<div>
					<span>{message}</span>
				</div>
			</div>
		{/each}
	</div>
</main>

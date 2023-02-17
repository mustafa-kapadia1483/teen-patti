<script>
	import { navButtonText, socket } from '../stores';
	import '../app.css';
</script>

<nav class="navbar bg-base-100">
	<div class="navbar-start">
		<a class="normal-case text-xl" href="/">Teen Patti</a>
	</div>
	<div class="navbar-end">
		<a class="mr-4 link link-hover" href="/">Github</a>
		<button class="btn btn-primary">{$navButtonText}</button>
	</div>
</nav>

<main class="container mx-auto px-2">
	<slot />
</main>

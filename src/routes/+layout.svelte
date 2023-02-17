<script>
	import { navButtonText } from '../stores';
	import '../app.css';
</script>

<nav class="navbar bg-base-100">
	<div class="navbar-start">
		<a class="normal-case text-xl" href="/">Teen Patti</a>
	</div>
	<div class="navbar-end">
		<a class="mr-4 link link-hover" href="/">Github</a>
		<a class="btn btn-primary" href="/4455" role="button">{$navButtonText}</a>
	</div>
</nav>

<main class="container mx-auto px-2">
	<slot />
</main>

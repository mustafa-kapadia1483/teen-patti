<script>
	import '../app.css';
</script>

<nav class="container mx-auto navbar bg-base-100">
	<div class="navbar-start">
		<a class="normal-case text-xl" href="/">Teen Patti</a>
	</div>
	<div class="navbar-end">
		<a class="mr-4 link link-hover" href="/">Github</a>
		<a href="/create-room" class="btn btn-primary">Create Room</a>
	</div>
</nav>

<main class="container mx-auto px-2">
	<slot />
</main>

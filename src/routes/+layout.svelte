<script lang="ts">
	import '../app.css';
	import { Toasts } from '#lib/components/Toasts/index.js';
	import GoogleAnalytics from '#lib/components/GoogleAnalytics.svelte';

	let { children } = $props();
</script>

<GoogleAnalytics />

<nav class="navbar bg-base-100 container mx-auto">
	<div class="navbar-start">
		<a class="text-xl normal-case" href="/">Teen Patti</a>
	</div>
	<div class="navbar-end">
		<a
			class="link link-hover mr-4"
			href="https://github.com/mustafa-kapadia1483/teen-patti"
			target="_blank"
			rel="noreferrer">Github</a
		>
		<a href="/create-room" class="btn btn-primary">Join / Create Room</a>
	</div>
</nav>

<main class="container mx-auto px-2">
	{@render children?.()}
	<Toasts />
</main>

<script lang="ts">
	import '../app.css';
	import { Toasts } from '#lib/components/Toasts/index.js';
	import GoogleAnalytics from '#lib/components/GoogleAnalytics.svelte';
	import { page } from '$app/state';
	import { fade, fly } from 'svelte/transition';

	let { children } = $props();
</script>

<GoogleAnalytics />

<nav class="navbar bg-base-100 container mx-auto relative z-20">
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

<main class="container mx-auto px-2 min-h-[calc(100vh-4rem)]">
	<div class="grid relative w-full">
		{#key page.url.pathname}
			<div 
				class="col-start-1 row-start-1 w-full"
				in:fly={{ y: 20, opacity: 0, duration: 400, delay: 400 }} 
				out:fade={{ duration: 400 }}
			>
				{@render children?.()}
			</div>
		{/key}
	</div>
	<Toasts />
</main>

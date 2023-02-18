<script>
  export let username;
</script>

<form class="bg-slate-700 flex md:w-96 items-end p-5 rounded-md mt-4 gap-2">
		<div class="form-control w-full max-w-xs">
			<label class="label" for="username">
				<span class="label-text">Username</span>
			</label>
			<input
				bind:value={username}
				required
				type="text"
				id="username"
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
			/>
		</div>

		<button class="btn btn-info" on:click> Create User </button>
	</form>
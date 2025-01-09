<script>
    /** @type {{selectedWinnerID: string, declareWinnerHanlder: Function, usersPlaying: Array<User>}} */
    let { selectedWinnerID = $bindable(), declareWinnerHanlder, usersPlaying } = $props();
</script>

<div class="form-control">
    <div class="input-group">
        <select bind:value={selectedWinnerID} class="select select-bordered">
            <option disabled selected>Pick Winner</option>
            {#each usersPlaying as user}
                <option value={user.id}>{user.username}</option>
            {/each}
        </select>
        <button onclick={declareWinnerHanlder} class="btn">Declare Winner</button>
    </div>
</div>
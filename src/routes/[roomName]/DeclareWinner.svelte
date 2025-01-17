<script lang="ts">
    interface Props {
        selectedWinnerID: string;
        declareWinnerHandler: (e: MouseEvent) => void;
        usersPlaying: User[];
    }
    let { selectedWinnerID = $bindable(), declareWinnerHandler, usersPlaying }: Props = $props();
</script>

<div class="form-control">
    <div class="input-group">
        <select bind:value={selectedWinnerID} class="select select-bordered">
            <option disabled selected>Pick Winner</option>
            {#each usersPlaying as user}
                <option value={user.id}>{user.username}</option>
            {/each}
        </select>
        <button onclick={declareWinnerHandler} class="btn">Declare Winner</button>
    </div>
</div>
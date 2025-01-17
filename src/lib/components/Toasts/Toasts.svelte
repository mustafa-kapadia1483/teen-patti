<script lang="ts">
    import { toastQueue } from './stores.svelte';
</script>
<div class="toast">
    {#each toastQueue as { message, type }}
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
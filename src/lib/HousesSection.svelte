<script lang="ts">
    import AHouse from "$lib/AHouse.svelte";
    import { houses } from "$lib/store";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    export let theme: "system" | "light" | "dark";
</script>


<section>
    {#each $houses as house}
        <AHouse {theme} {house} on:save />
    {/each}
    <button on:click={() => dispatch("addHouse")}>Add house</button>
    <button on:click={() => dispatch("settings")}>Settings</button>
</section>

<style>
    section {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 20px;
        gap: 10px;
    }

    button {
        border: none;
        font-family: var(--font);
        font-size: 0.8rem;
        background-color: var(--accent);
        padding: 7px 5px;
        border-radius: 5px;
        color: var(--text);
        cursor: pointer;
    }
</style>
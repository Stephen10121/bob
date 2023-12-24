<script lang="ts">
    import Song from "./Song.svelte";
    import type { House } from "./store";

    export let house: House;
</script>

<ul>
    {#each house.songs as song}
        <Song {song} {house} on:save />
    {/each}
</ul>
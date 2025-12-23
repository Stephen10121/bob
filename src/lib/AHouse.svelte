<script lang="ts">
    import { Drawer } from "slider-upper";
    import HouseInfo from "./HouseInfo.svelte";
    import type { House } from "./store";

    export let house: House;
    export let theme: "system" | "light" | "dark";

    let showHouseInfo = false;
</script>

<button on:click={() => showHouseInfo=true}>
    {house.name}
</button>

{#if showHouseInfo}
    <Drawer {theme} on:close={() => showHouseInfo=false} showHeaderBar borderColor={theme!="light" ? "#ffffff" : ""}>
        <HouseInfo {theme} houseInfo={house} on:save />
    </Drawer>
{/if}

<style>
    button {
        border: 1px solid var(--accent);
        padding: 5px;
        border-radius: 5px;
        background: none;
        color: var(--text);
        display: flex;
        cursor: pointer;
    }
</style>
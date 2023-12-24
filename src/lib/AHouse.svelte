<script lang="ts">
    import HouseInfo from "./HouseInfo.svelte";
    import Modal from "./Modal.svelte";
    import type { House } from "./store";

    export let house: House;

    let showHouseInfo = false;
</script>

<button on:click={() => showHouseInfo=true}>
    {house.name}
</button>

{#if showHouseInfo}
    <Modal on:close={() => showHouseInfo=false} speedMS={200} header={house.name}>
        <HouseInfo houseInfo={house} on:save />
    </Modal>
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
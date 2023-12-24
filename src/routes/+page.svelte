<script lang="ts">
    import Modal from "$lib/Modal.svelte";
    import { houses } from "$lib/store";
    import HousesSection from "$lib/HousesSection.svelte";

    let addHouseModal = false;
    let newHouseName = "";

    function addHouse() {
        let arrivalTime = Date.now();

        $houses.push({
            arrival: arrivalTime,
            name: newHouseName,
            songs: [],
            departure: undefined
        });

        $houses = $houses;
        newHouseName = "";
        songClose = true;
        save();
        setTimeout(() => songClose=false, 200);
    }
    let songClose = false;

    function save() {
        window.localStorage.setItem("houses", JSON.stringify($houses));
        console.log("saved");
    }
</script>

<HousesSection on:addHouse={() => addHouseModal = true} on:save={save} />

{#if addHouseModal}
    <Modal on:close={() => addHouseModal=false} header="New House" forceClose={songClose}>
        <section>
            <input type="text" placeholder="House Name" bind:value={newHouseName} />
            <button on:click={addHouse}>Add House</button>
            <p class="disclaimer">*By adding the house, you set the arrival time as well.</p>
        </section>
    </Modal>
{/if}

<style>
    p {
        font-family: var(--font);
    }

    section {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 20px;
        gap: 10px;
    }

    input {
        border: 2px solid var(--accent);
        padding: 5px;
        border-radius: 5px;
        color: var(--text);
        background: none;
    }

    input::placeholder {
        color: var(--text);
    }

    input:focus {
        outline: 2px solid var(--accent);
        outline-offset: 1px;
    }

    button {
        border: none;
        font-family: var(--font);
        font-size: 0.8rem;
        background-color: var(--accent);
        padding: 7px 5px;
        border-radius: 5px;
        color: var(--text);
    }

    .disclaimer {
        font-family: var(--font);
        font-size: 0.8rem;
        font-style: italic;
        color: var(--text);
    }
</style>
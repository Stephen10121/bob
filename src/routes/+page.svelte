<script lang="ts">
    import HousesSection from "$lib/HousesSection.svelte";
    import Settings from "$lib/Settings.svelte";
    import { Drawer } from "slider-upper";
    import { houses } from "$lib/store";

    let addHouseModal = false;
    let settingsModal = false;
    let newHouseName = "";

    export let data;

    let theme: "light" | "dark" | "system" = data.theme === "lightTheme" ? "light" : data.theme === "darkTheme" ? "dark" : "system";

    function addHouse() {
        $houses.push({
            arrival: 0,
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

<HousesSection {theme} on:settings={() => settingsModal = true} on:addHouse={() => addHouseModal = true} on:save={save} />

{#if addHouseModal}
    <Drawer {theme} on:close={() => addHouseModal=false} showHeaderBar closeDrawer={songClose} borderColor={theme!="light" ? "#ffffff" : ""}>
        <section>
            <input type="text" placeholder="House Name" bind:value={newHouseName} />
            <button on:click={addHouse}>Add House</button>
        </section>
    </Drawer>
{/if}
{#if settingsModal}
    <Drawer {theme} on:close={() => settingsModal=false} showHeaderBar borderColor={theme!="light" ? "#ffffff" : ""}>
        <Settings theme={data.theme} />
    </Drawer>
{/if}

<style>
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
</style>

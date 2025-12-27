<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { Drawer } from "slider-upper";
    import SongInfo from "./SongInfo.svelte";
    import { houses, type House, type Song } from "./store";

    export let houseInfo: House;
    export let theme: "system" | "light" | "dark";
let diff =0;

    const dispatch = createEventDispatcher();
    $: arrivalTime = houseInfo.arrival !==0 ? new Date(houseInfo.arrival) : false;
    $: departure = houseInfo.departure ? new Date(houseInfo.departure) : false;

    $: {
        if (arrivalTime && departure) diff = (departure - arrivalTime) / 60000;
    }

    function deleteHouse() {
        let newHouses = [];
        for (let i=0;i<$houses.length;i++) {
            if ($houses[i].id !== houseInfo.id) {
                newHouses.push($houses[i]);
            }
        }

        $houses = newHouses;

        dispatch("save");
    }

    function setArrival() {
        let newHouseInfo = houseInfo;
        let newHouses = [];
        newHouseInfo.arrival = Date.now();

        for (let i=0;i<$houses.length;i++) {
            if ($houses[i].name === houseInfo.name) {
                newHouses.push(newHouseInfo);
            } else {
                newHouses.push($houses[i])
            }
        }

        $houses = newHouses;

        dispatch("save");
    }

    function setDeparture() {
        let newHouseInfo = houseInfo;
        let newHouses = [];
        newHouseInfo.departure = Date.now();

        for (let i=0;i<$houses.length;i++) {
            if ($houses[i].name === houseInfo.name) {
                newHouses.push(newHouseInfo);
            } else {
                newHouses.push($houses[i])
            }
        }

        $houses = newHouses;

        dispatch("save");
    }

    let addSong = false;
    let newSongName = "";

    function addNewSong() {
        let newSong: Song = {
            id: crypto.randomUUID(),
            name: newSongName,
            startSinging: undefined,
            endSinging: undefined
        }

        let newHouseInfo = houseInfo;
        let newHouses = [];
        newHouseInfo.songs.push(newSong);
        for (let i=0;i<$houses.length;i++) {
            if ($houses[i].name === houseInfo.name) {
                newHouses.push(newHouseInfo);
            } else {
                newHouses.push($houses[i])
            }
        }

        $houses = newHouses;

        newSongName = "";

        dispatch("save");
        songClose = true;
        setTimeout(() => songClose=false, 200);
    }
    let songClose = false;
</script>

<section>
    <ul>
        <li>Name: {houseInfo.name} <span class="right"><button on:click={deleteHouse}>Delete House</button></li>
        <li>Arrival: {arrivalTime === false ? "Not Set": arrivalTime} {#if arrivalTime === false}<span class="right"><button on:click={setArrival}>Set Arrival</button></span>{/if}</li>
        <li>Departure: {departure===false ? "Not Set" : departure} {#if departure===false}<span class="right"><button on:click={setDeparture}>Set Departure</button></span>{/if}</li>
{#if diff>0}<li>Minutes spent: {diff}</li>{/if}
        <li>Songs <span class="right"><button on:click={() => addSong=true}>Add Song</button></span>
            <span>
                <SongInfo house={houseInfo} on:save />
            </span>
        </li>
    </ul>
</section>

{#if addSong}
    <Drawer {theme} on:close={() => addSong=false} showHeaderBar borderColor={theme!="light" ? "#ffffff" : ""} closeDrawer={songClose}>
        <section class="addSongSect">
            <input type="text" placeholder="Song Name" bind:value={newSongName} />
            <button on:click={addNewSong}>Add Song</button>
        </section>
    </Drawer>
{/if}

<style>
    section {
        width: 100%;
        padding: 20px;
    }
    .addSongSect {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 20px;
        gap: 10px;
    }
    ul {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    ul li {
        color: var(--text);
        list-style: none;
        width: 100%;
        font-family: var(--font);
        font-size: 0.9rem;
    }

    ul li::before {
        content: "\2022";  /* Add content: \2022 is the CSS Code/unicode for a bullet */
        color: var(--text); /* Change the color */
        font-weight: bold; /* If you want it to be bold */
        display: inline-block; /* Needed to add space between the bullet and the text */
        width: 1em; /* Also needed for space (tweak if needed) */
        margin-left: -1em; /* Also needed for space (tweak if needed) */
    }

    ul li .right {
        float: right;
    }

    button {
        font-family: var(--font);
        color: var(--text);
        background-color: var(--accent);
        border: none;
        padding: 5px 10px;
        font-size: 0.9rem;
        border-radius: 100vw;
        cursor: pointer;
    }

    .addSongSect input {
        border: 2px solid var(--accent);
        padding: 5px;
        border-radius: 5px;
        color: var(--text);
        background: none;
    }

    .addSongSect input::placeholder {
        color: var(--text);
    }

    .addSongSect input:focus {
        outline: 2px solid var(--accent);
        outline-offset: 1px;
    }

    .addSongSect button {
        border: none;
        font-family: var(--font);
        font-size: 0.8rem;
        background-color: var(--accent);
        padding: 7px 5px;
        border-radius: 5px;
        color: var(--text);
    }
</style>
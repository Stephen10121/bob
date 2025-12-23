<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import type { House, Song } from "./store";
    import { houses } from "./store";

    export let song: Song;
    export let house: House;

    const dispatch = createEventDispatcher();
    $: stopSinging = song.endSinging ? new Date(song.endSinging) : false;
    $: startSingins = song.startSinging ? new Date(song.startSinging) : false;

    function deleteSong() {
        let newHouseInfo = house;
        let newHouseSongs = [];

        for (let i=0;i<newHouseInfo.songs.length;i++) {
            if (newHouseInfo.songs[i].id !== song.id) {
                newHouseSongs.push(newHouseInfo.songs[i]);
            }
        }

        newHouseInfo.songs = newHouseSongs;
        let newHouses = [];
        for (let i=0;i<$houses.length;i++) {
            if ($houses[i].name === newHouseInfo.name) {
                newHouses.push(newHouseInfo);
            } else {
                newHouses.push($houses[i])
            }
        }

        $houses = newHouses;
        dispatch("save");
    }

    function setSongStart() {
        let newSong = song;
        newSong.startSinging = Date.now();

        let newHouseInfo = house;
        let newHouseSongs = [];

        for (let i=0;i<newHouseInfo.songs.length;i++) {
            if (newHouseInfo.songs[i].name === newSong.name) {
                newHouseSongs.push(newSong);
            } else {
                newHouseSongs.push(newHouseInfo.songs[i]);
            }
        }

        newHouseInfo.songs = newHouseSongs;
        let newHouses = [];
        for (let i=0;i<$houses.length;i++) {
            if ($houses[i].name === newHouseInfo.name) {
                newHouses.push(newHouseInfo);
            } else {
                newHouses.push($houses[i])
            }
        }

        $houses = newHouses;
        dispatch("save");
    }
    
    function setSongDone() {
        let newSong = song;
        newSong.endSinging = Date.now();

        let newHouseInfo = house;
        let newHouseSongs = [];

        for (let i=0;i<newHouseInfo.songs.length;i++) {
            if (newHouseInfo.songs[i].name === newSong.name) {
                newHouseSongs.push(newSong);
            } else {
                newHouseSongs.push(newHouseInfo.songs[i]);
            }
        }

        newHouseInfo.songs = newHouseSongs;
        let newHouses = [];
        for (let i=0;i<$houses.length;i++) {
            if ($houses[i].name === newHouseInfo.name) {
                newHouses.push(newHouseInfo);
            } else {
                newHouses.push($houses[i])
            }
        }

        $houses = newHouses;
        dispatch("save");
    }
</script>
<li>
    {song.name}
    <span class="right"><button on:click={deleteSong}>Delete Song</button>
    <ul>
        <li>Start Time: {startSingins==false ? "Not Set" : startSingins} {#if startSingins===false}<span class="right"><button on:click={setSongStart}>Set Start Time</button></span>{/if}</li>
        <li>Stop Time: {stopSinging==false ? "Not Set" : stopSinging} {#if stopSinging===false}<span class="right"><button on:click={setSongDone}>Set End Time</button></span>{/if}</li>
    </ul>
</li>

<style>
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
</style>
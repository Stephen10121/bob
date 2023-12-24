<script lang="ts">
    import { houses } from '$lib/store.js';
    import { onMount } from 'svelte';

    export let data;

    let theme = data.theme;

    function themeChange(event: any) {
        document.cookie = `theme=${event.target.value}; expires=Thu, 18 Dec 2030 12:00:00 UTC`;
        theme = event.target.value;
    }

    onMount(() => {
        let savedHouses = [];

        try {
            let fetchHouses = window.localStorage.getItem("houses");
            let trySavedHouses = JSON.parse(fetchHouses ? fetchHouses : "[]");

            savedHouses = trySavedHouses;
        } catch (err) {
            console.error(err);
        }

        $houses = savedHouses;
    });
</script>

<div id="themeSetter" class="{theme}" />

<select on:change={themeChange} title="Choose theme">
    <!-- excuse the ugly code -->
    <option value="darkTheme" selected={data.theme==="darkTheme"}>Dark</option>
    <option value="lightTheme" selected={data.theme==="lightTheme"}>Light</option>
    <option value="systemTheme" selected={data.theme==="systemTheme"}>System</option>
</select>

<slot />

<style>
    @media (prefers-color-scheme: light) {
        :global(body):has(#themeSetter.systemTheme) {
            --text: #131615;
            --background: #f6f9f7;
            --primary: #59ab7e;
            --secondary: #97d8b5;
            --accent: #69d89d;
            --filter-svg: 0;
        }
    }

    @media (prefers-color-scheme: dark) {
        :global(body):has(#themeSetter.systemTheme) {
            --text: #e9eceb;
            --background: #060907;
            --primary: #54a679;
            --secondary: #276845;
            --accent: #27965b;
            --filter-svg: 1;
        }
    }

    :global(body):has(#themeSetter.darkTheme) {
        --text: #e9eceb;
        --background: #060907;
        --primary: #54a679;
        --secondary: #276845;
        --accent: #27965b;
        --filter-svg: 1;
    }

    :global(body):has(#themeSetter.lightTheme) {
        --text: #131615;
        --background: #f6f9f7;
        --primary: #59ab7e;
        --secondary: #97d8b5;
        --accent: #69d89d;
        --filter-svg: 0;
    }

    :global(body) {
        --font: Verdana, Geneva, Tahoma, sans-serif;
    }
</style>
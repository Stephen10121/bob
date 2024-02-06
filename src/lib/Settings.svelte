<script lang="ts">
    import { onMount } from "svelte";
    import type { Themes } from "../routes/+layout.server";

    export let theme: Themes;

    function themeChange(event: any) {
        document.cookie = `theme=${event.target.value}; expires=Thu, 18 Dec 2030 12:00:00 UTC`;
        theme = event.target.value;
    }

    onMount(() => {
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(window.localStorage.getItem("houses")!);
        var dlAnchorElem = document.getElementById('downloadAnchorElem');
        if (dlAnchorElem) {
            dlAnchorElem.setAttribute("href", dataStr);
            dlAnchorElem.setAttribute("download", "houses.json");
            // dlAnchorElem.click();
        }
    });
</script>

<a id="downloadAnchorElem">Download Json</a>
<select on:change={themeChange} title="Choose theme">
    <!-- excuse the ugly code -->
    <option value="darkTheme" selected={theme==="darkTheme"}>Dark</option>
    <option value="lightTheme" selected={theme==="lightTheme"}>Light</option>
    <option value="systemTheme" selected={theme==="systemTheme"}>System</option>
</select>


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
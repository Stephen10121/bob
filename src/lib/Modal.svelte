<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import closeImage from "../assets/close.svg";

    export let speedMS = 200;
    export let header = "";
    export let forceClose = false;

    let diff = 0;
    let topmodal = "20px";
    let mouseDown = false;
    let modal: HTMLElement;
    let transition = false;

    const dispatch = createEventDispatcher();

    $: {
        if (forceClose) {
            close();
        }
    }

    function downMouse(event: MouseEvent) {
        diff = event.clientY - modal.getBoundingClientRect().top;
        mouseDown = true;
    }

    function downTouch(event: TouchEvent) {
        diff = event.targetTouches[0].clientY - modal.getBoundingClientRect().top;
        mouseDown = true;
    }

    function moveMouse(event: MouseEvent) {
        event.preventDefault();
        if (!mouseDown) return;
        topmodal = `${Math.max(event.clientY - diff, 20)}px`;
    }

    function moveTouch(event: TouchEvent) {
        if (!mouseDown) return;
        topmodal = `${Math.max(event.targetTouches[0].clientY - diff, 20)}px`;
    }

    function upMouse() {
        mouseDown = false;

        let modTop = modal.getBoundingClientRect().top;
        if (modTop < 100) {
            transition = true;
            topmodal = "20px";
            setTimeout(() => {transition=false}, speedMS);
        } else {
            close();
        }
    }

    function close() {
        transition = true;
        topmodal = "100%";
        window.navigator.vibrate(100);
        setTimeout(() => {
            transition=false;
            dispatch("close");
            window.navigator.vibrate(0);
        }, speedMS);
    }
</script>

<section bind:this={modal} style="top:{topmodal};--speed:{speedMS}ms" class="{transition ? "transition" : ""}">
    <header>
        <h2>{header}</h2>
        <button on:click={close} title="Close Modal">
            <img src={closeImage} alt="Close Modal">
        </button>
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
            class="headerCover {mouseDown && "big"}"
            on:touchstart={downTouch}
            on:mousedown={downMouse}
            on:touchmove={moveTouch}
            on:mousemove={moveMouse}
            on:touchend={upMouse}
            on:mouseup={upMouse}
        />
    </header>
    <main>
        <slot />
    </main>
</section>

<style>
    section {
        outline: 2px solid var(--secondary);
        width: 100vw;
        left: 0;
        height: calc(100vh - 20px);
        height: calc(100dvh - 20px);
        position: fixed;
        background-color: var(--background);
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        animation: show var(--speed) linear forwards;
    }

    @keyframes show {
        0% {
            transform: translateY(100%);
        }
        100% {
            transform: translateY(0);
        }
    }

    section.transition {
        transition: top var(--speed) linear;
    }

    header {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        position: relative;
    }

    main {
        width: 100%;
        height: calc(100% - 50px);
        overflow-y: auto;
    }

    .headerCover {
        position: absolute;
        width: calc(100% - 50px);
        height: 100%;
        left: 0;
        /* background-color: #0088ff4f; */
        top: 0;
    }

    .headerCover.big {
        width: 100%;
        height: 500px;
        top: -200px;
    }

    h2 {
        color: var(--text);
        font-family: var(--font);
    }

    button {
        border: none;
        background: none;
        height: 20px;
        cursor: pointer;
    }

    button img {
        height: 100%;
        filter: invert(var(--filter-svg));
    }
</style>
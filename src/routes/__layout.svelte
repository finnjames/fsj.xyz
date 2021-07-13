<script lang="ts">
  import Footer from "$lib/Footer.svelte";
  import Header from "$lib/Header.svelte";
  import { page } from "$app/stores";
  import { colorMode } from "@/stores.ts";
  import { onDestroy, onMount } from "svelte";

  function getInitialColorMode() {
    const persistedColorMode = window.localStorage.getItem("color-mode");
    const hasPersistedColorMode = typeof persistedColorMode === "string";
    if (hasPersistedColorMode) {
      console.log(`loaded color mode: ${persistedColorMode}`);
      return persistedColorMode;
    }
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const hasMediaQueryPreference = typeof mql.matches === "boolean";

    if (hasMediaQueryPreference) {
      return mql.matches ? "dark" : "light";
    }
    return "light";
  }

  onMount(() => {
    colorMode.setMode(getInitialColorMode());
    setColorMode($colorMode);
  });

  let unsubscribe = colorMode.subscribe((colorMode) => {
    try {
      setColorMode(colorMode);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  });

  onDestroy(unsubscribe);

  function setColorMode(newMode: string, localStorage = false) {
    if (newMode === "") {
      document.body.getAttribute("data-color-mode") === "dark"
        ? (newMode = "light")
        : (newMode = "dark");
    }
    document.body.setAttribute("data-color-mode", newMode);
    if (localStorage) {
      window.localStorage.setItem("color-mode", newMode);
    }
  }
  function toggleMode() {
    colorMode.toggle();
    setColorMode($colorMode, false); // TODO: persist color mode?
  }
</script>

<svelte:head>
  <link href="/normalize.css" rel="stylesheet" />
  <link href="/hint.min.css" rel="stylesheet" />
</svelte:head>

<div class="container">
  <Header />
  <main>
    <content>
      <slot />
    </content>
    {#if $page.path != "/"}
      <Footer />
    {/if}
  </main>
</div>

<style lang="scss" global>
  @import "../static/main.scss";
  #svelte {
    height: 100vh;
    width: 100vw;
    padding: 0;
    margin: 0;
  }
  .container {
    display: grid;
    grid-template-columns: minmax(4%, auto) minmax(auto, 42rem) minmax(4%, auto);
    grid-template-rows: auto 1fr;
    gap: 0px 0px;
    height: 100%;
    grid-template-areas:
      ". hd ."
      ". main .";
  }

  header {
    grid-area: hd;
  }
  main {
    grid-area: main;
    display: flex;
    flex-direction: column;
  }
  content {
    flex: 1 0 auto;
  }
  footer {
    flex-shrink: 0;
  }
</style>

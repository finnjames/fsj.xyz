<script lang="ts">
  import Footer from "$lib/Footer.svelte";
  import Header from "$lib/Header.svelte";
  import { page } from "$app/stores";
  import { colorMode } from "@/stores";
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
      // on initial set, document hasn't loaded yet :/
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  });

  onDestroy(unsubscribe);

  function setColorMode(newMode: string, localStorage = false) {
    const de = document.documentElement;
    if (newMode === "") {
      de.getAttribute("data-color-mode") === "dark" ? (newMode = "light") : (newMode = "dark");
    }
    de.setAttribute("data-color-mode", newMode);
    if (localStorage) {
      window.localStorage.setItem("color-mode", newMode);
    }
  }
</script>

<svelte:head>
  <link rel="preload" href="/normalize.css" as="style" />
  <link rel="preload" href="/fonts.css" as="style" />

  <link rel="stylesheet" href="/normalize.css" />
  <link rel="stylesheet" href="/hint.min.css" />
  <link rel="stylesheet" href="/fonts.css" />
  <link rel="stylesheet" href="/prism.css" />

  <script>
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

    colorMode = getInitialColorMode();
    const root = document.documentElement;

    root.setAttribute("data-color-mode", colorMode);
  </script>
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XRLEG6433K"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());

    gtag("config", "G-XRLEG6433K");
  </script>
</svelte:head>

<div class="container">
  <Header />
  <main>
    <content>
      <slot />
    </content>
    {#if $page.url.pathname != "/"}
      <Footer />
    {/if}
  </main>
</div>

<style lang="scss" global>
  @import "../static/main.scss";
  .container {
    display: grid;
    grid-template-columns: minmax(4%, auto) minmax(auto, 42rem) minmax(4%, auto);
    grid-template-rows: auto 1fr;
    gap: 0px 0px;
    height: 100%;
    width: 100%;
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

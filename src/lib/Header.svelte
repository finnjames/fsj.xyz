<script lang="ts">
  import { page } from "$app/stores";
  import { colorMode } from "@/stores";
  const nav = [
    { name: "CV", link: "/cv" },
    { name: "Posts", link: "/posts" },
    { name: "Portfolio", link: "/portfolio" }
  ];
  let menuOpen = false;
  let icons = {
    light: `<svg xmlns="http://www.w3.org/2000/svg" style="overflow: visible" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
    dark: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`
  };
</script>

<header id="header">
  <div id="logo">
    <a href="/">
      <img id="logo-svg" src="/images/fsj.svg" alt="fsj logo" height="100" width="100" />
      <img id="logo-shadow" src="/images/fsj.svg" alt="fsj logo" height="100" width="100" />
    </a>
  </div>
  <nav class:active={menuOpen}>
    <div class="nav-container">
      {#each nav as item, i}
        <a
          class="nav-item"
          tabindex="0"
          style="transition-delay: {i * 32}ms"
          class:active={item.link === $page.url.pathname}
          on:click={() => (menuOpen = false)}
          sveltekit:prefetch
          href={item.link}
        >
          {@html item.name}
        </a>
      {/each}
      <button
        class="nav-item"
        class:portfolio={$page.url.pathname === "/portfolio"}
        id="color-mode-toggle"
        on:click={colorMode.toggle}
        style="transition-delay: {nav.length * 32}ms"
      >
        {@html icons[$colorMode]}
      </button>
    </div>
    <button id="menu-icon" aria-label="menu" on:click={() => (menuOpen = !menuOpen)}>
      <div />
    </button>
    <div id="blur" />
  </nav>
</header>

<style lang="scss">
  #header {
    display: flex;
    align-items: center;
    position: relative;
    padding-top: 1rem;
    z-index: 1;
  }
  #color-mode-toggle {
    touch-action: manipulation;
    stroke: white;
    fill: var(--fg);
    display: inline-flex;
    justify-content: center;
    padding-left: 1rem;
    svg {
      fill: var(--fg);
      stroke: var(--fg);
    }
    &.portfolio {
      opacity: 0.4;
    }
    cursor: pointer;
  }
  #logo {
    touch-action: manipulation;
    transition: transform 100ms ease, filter 100ms ease;
    // z-index: 2;
    &:hover {
      transition: transform 240ms cubic-bezier(0, 0.62, 0.34, 1);
      transform: scale(116%) rotate(-4deg);
      #logo-shadow {
        top: 0.2rem;
        opacity: 0.2;
        transition: all 240ms cubic-bezier(0, 0.62, 0.34, 1);
      }
    }
    &:active {
      transition: transform 100ms ease;
      transform: scale(112%) rotate(-3deg);
      #logo-shadow {
        transition: all 100ms ease;
        top: 0.15rem;
        opacity: 0.15;
      }
    }
    position: relative;
    #logo-shadow {
      left: 0;
      top: 0;
      position: absolute;
      z-index: -1;
      opacity: 0;
      filter: brightness(0) blur(0.2rem);
      transition: all 100ms ease, filter 100ms ease;
    }
  }
  nav {
    .nav-container {
      display: flex;
      align-items: center;
    }
    button {
      background: none;
      border: none;
    }
    .nav-item {
      touch-action: manipulation;
      padding: 1.2rem;
      display: block;
      text-decoration: none;
      font-variation-settings: "wght" 400, "CASL" 1, "slnt" -15;
      font-size: larger;
      transform: translateY(-4px);
      color: var(--fg);
      transition: font-variation-settings 100ms;
      &:first-of-type {
        padding-left: 2.4rem;
      }
      &:hover {
        font-variation-settings: "wght" 840, "CASL" 1, "slnt" -15;
      }
      &:active {
        font-variation-settings: "wght" 840, "CASL" 1, "slnt" -15;
      }
      &.active {
        color: var(--magenta);
        font-variation-settings: "wght" 840, "CASL" 1, "slnt" -15;
      }
    }
  }
  #menu-icon {
    touch-action: manipulation;
    display: none;
    height: 4rem;
    width: 4rem;
    padding: 0.8rem;
    transform: translateY(-4px);
    cursor: pointer;
    div {
      visibility: hidden;
    }
    &::before,
    &::after,
    & div {
      background: var(--fg);
      content: "";
      display: block;
      height: 8px;
      border-radius: 100px;
      margin: 3px 0;
      transition: 0.5s cubic-bezier(0, 0.62, 0.34, 1);
    }
  }
  .active #menu-icon {
    &:before {
      margin: 7px 0;
      transform: translateY(8px) rotate(135deg);
    }
    &:after {
      margin: 7px 0;
      transform: translateY(-22px) rotate(-135deg);
    }
  }
  #blur {
    pointer-events: none;
    z-index: -1;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    transition: opacity 300ms cubic-bezier(0, 0.62, 0.34, 1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--bg);
      opacity: 0.7;
    }
  }
  @media screen and (max-width: 767px) {
    nav {
      z-index: 1;
      position: fixed;
      right: 0.4rem;
      padding-right: 0.8rem;
      flex-direction: row-reverse;
      .nav-container {
        flex-direction: column;
        align-items: flex-end;
        position: absolute;
        top: 4rem;
        right: 0;
        visibility: hidden;
      }
      #menu-icon {
        display: block;
      }
      .nav-item {
        font-size: x-large;
        font-variation-settings: "wght" 400, "CASL" 1, "slnt" -15;
        opacity: 0;
        transform: translateX(6rem);
        transition: transform 300ms cubic-bezier(0, 0.62, 0.34, 1),
          opacity 300ms cubic-bezier(0, 0.62, 0.34, 1),
          visibility 300ms cubic-bezier(0, 0.62, 0.34, 1);
      }
      &.active {
        position: fixed;
        .nav-item {
          transform: translateX(-0.5rem);
          visibility: visible;
          opacity: 1;
          transition: transform 600ms cubic-bezier(0, 0.62, 0.34, 1),
            opacity 600ms cubic-bezier(0, 0.62, 0.34, 1),
            visibility 600ms cubic-bezier(0, 0.62, 0.34, 1);
        }
        #blur {
          opacity: 1;
          pointer-events: auto;
        }
      }
    }
  }
</style>

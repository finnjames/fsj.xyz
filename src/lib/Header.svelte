<script lang="ts">
  import { page } from "$app/stores";
  const nav = [
    { name: "CV", link: "/cv" },
    { name: "Posts", link: "/posts" },
    { name: "Portfolio", link: "/portfolio" }
  ];
  let menuOpen = false;
</script>

<header id="header">
  <div id="logo">
    <a href="/">
      <img id="logo-svg" src="/images/fsj.svg" alt="fsj logo" width="100" />
      <img id="logo-shadow" src="/images/fsj.svg" alt="fsj logo" width="100" />
    </a>
  </div>
  <nav class:active={menuOpen}>
    <div class="nav-container">
      {#each nav as item, i}
        <a
          class="nav-item"
          style="transition-delay: {i * 32}ms"
          class:active={item.link === $page.path}
          on:click={() => (menuOpen = false)}
          href={item.link}
        >
          {item.name}
        </a>
      {/each}
    </div>
    <button class="menu-icon" on:click={() => (menuOpen = !menuOpen)}>
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
    // padding: 1rem 4% 0;
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
      display: none;
      background: none;
      border: none;
    }
    .nav-item {
      touch-action: manipulation;
      padding: 1.2rem;
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
        // color: var(--fg-hover);
        font-variation-settings: "wght" 800, "CASL" 1, "slnt" -15;
      }
      &:active {
        // color: var(--fg-active);
        font-variation-settings: "wght" 800, "CASL" 1, "slnt" -15;
      }
      &.active {
        color: var(--purple);
        font-variation-settings: "wght" 800, "CASL" 1, "slnt" -15;
      }
    }
  }
  .menu-icon {
    touch-action: manipulation;
    display: none;
    height: 3rem;
    width: 3rem;
    cursor: pointer;
    div {
      visibility: hidden;
    }
    &:before,
    &:after,
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
  .active .menu-icon {
    &:before {
      margin: 7px 0;
      transform: translateY(12px) rotate(135deg);
    }
    &:after {
      margin: 7px 0;
      transform: translateY(-18px) rotate(-135deg);
    }
  }
  #blur {
    pointer-events: none;
    background-color: rgba(white, 0.6);
    z-index: -1;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    transition: opacity 300ms cubic-bezier(0, 0.62, 0.34, 1);
    backdrop-filter: blur(10px);
  }
  @media screen and (max-width: 767px) {
    nav {
      z-index: 1;
      position: absolute;
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
      .menu-icon {
        display: block;
      }
      .nav-item {
        font-size: x-large;
        font-variation-settings: "wght" 800, "CASL" 1, "slnt" -15;
        opacity: 0;
        transform: translateX(6rem);
        transition: transform 300ms cubic-bezier(0, 0.62, 0.34, 1),
          opacity 300ms cubic-bezier(0, 0.62, 0.34, 1),
          visibility 300ms cubic-bezier(0, 0.62, 0.34, 1);
      }
      &.active {
        position: fixed;
        right: calc(4% + 0.4rem); // TODO: don't hard code this
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

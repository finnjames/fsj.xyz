<script lang="ts">
  import { page } from "$app/stores";
  const nav = [
    { name: "CV", link: "/cv" },
    { name: "Posts", link: "/posts" },
    { name: "Portfolio", link: "/portfolio" },
    { name: "Contact", link: "/contact" }
  ];
</script>

<svelte:head>
  <title>Finn James</title>
</svelte:head>

<div id="header">
  <div id="logo">
    <a href="/">
      <img src="/images/fsj.svg" alt="fsj logo" width="100" />
    </a>
  </div>
  <nav>
    {#each nav as item, i}
      <a class:active={item.link === $page.path} href={item.link}>
        {item.name}
      </a>
    {/each}
  </nav>
</div>

<style lang="scss">
  #header {
    display: flex;
    align-items: center;
  }
  #logo {
    opacity: 1;
    transition: transform 100ms ease, filter 100ms ease;
    &:hover {
      transition: transform 200ms cubic-bezier(0.51, 0.01, 0.44, 2);
      transform: scale(112%) rotate(-4deg);
    }
    &:active {
      transition: transform 100ms ease;
      transform: none;
    }
  }
  nav {
    display: flex;
    align-items: center;
    a {
      padding: 1.2rem;
      // text-transform: uppercase;
      text-decoration: none;
      font-variation-settings: "wght" 400, "CASL" 1, "slnt" -15;
      font-size: larger;
      transform: translateY(-4px);
      color: var(--fg);
      opacity: 0.4;
      transition: font-variation-settings 100ms;
      &:first-of-type {
        margin-left: 1.4rem;
      }
      &:hover {
        font-variation-settings: "wght" 800, "CASL" 1, "slnt" -15;
      }
      &:active {
        opacity: 0.8;
        font-variation-settings: "wght" 800, "CASL" 1, "slnt" -15;
      }
      &.active {
        opacity: 1;
        font-variation-settings: "wght" 800, "CASL" 1, "slnt" -15;
      }
    }
  }
</style>

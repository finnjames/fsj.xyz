<script lang="ts">
  import { page } from "$app/stores";
  const nav = [
    { name: "CV", link: "/cv" },
    { name: "Blog", link: "/blog" },
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
      <img src="/images/fsj.png" alt="fsj logo" width="100" />
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
  #logo:hover {
    animation: jiggle 500ms 1 cubic-bezier(0.11, 0.87, 0.7, 1.01);
    opacity: 1;
  }
  @keyframes jiggle {
    0% {
      transform: rotate(0deg) scale(100%);
    }
    10% {
      transform: rotate(4deg) scale(100%);
    }
    35% {
      transform: rotate(-8deg) scale(100%);
    }
    60% {
      transform: rotate(4deg) scale(100%);
    }
    80% {
      transform: rotate(-2deg) scale(100%);
    }
    100% {
      transform: rotate(0deg) scale(100%);
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

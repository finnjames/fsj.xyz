<script lang="ts">
  import { page } from "$app/stores";
  const nav = [
    { name: "cv", link: "/cv" },
    { name: "blog", link: "/blog" },
    { name: "portfolio", link: "/portfolio" },
    { name: "contact", link: "/contact" }
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
    animation: jiggle 700ms 1 ease-in-out;
    opacity: 1;
  }
  @keyframes jiggle {
    0% {
      transform: rotate(5deg);
    }
    30% {
      transform: rotate(-10deg);
    }
    60% {
      transform: rotate(5deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
  nav {
    display: flex;
    align-items: center;
    a {
      padding: 1.2rem;
      text-transform: uppercase;
      text-decoration: none;
      font-size: larger;
      transform: translateY(-4px);
      color: var(--med-gray);
      transition: opacity 100ms;
      &:first-of-type {
        margin-left: 1.4rem;
      }
      &:hover {
        opacity: 0.6;
      }
      &:active {
        opacity: 0.4;
      }
      &.active {
        color: var(--dark-gray);
      }
    }
  }
</style>

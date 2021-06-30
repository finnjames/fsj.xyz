<script lang="ts">
  import { page } from "$app/stores";
  const nav = [
    { name: "cv", link: "/cv" },
    { name: "blog", link: "/blog" },
    { name: "portfolio", link: "/portfolio" },
    { name: "polywork", link: "https://polywork.fsj.xyz" },
    { name: "contact", link: "/contact" }
  ];
</script>

<svelte:head>
  <title>Finn James</title>
</svelte:head>

<div id="header">
  <div id="logo">
    <a href="/">
      <img src="/fsj.png" alt="fsj logo" width="72" />
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
  nav {
    display: flex;
    align-items: center;
    a {
      padding: 1rem;
      text-transform: uppercase;
      text-decoration: none;
      color: var(--med-gray);
      &:hover {
        color: var(--med-dark-gray);
      }
      &.active {
        color: var(--dark-gray);
      }
    }
  }
</style>

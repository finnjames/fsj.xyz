<script lang="ts">
  import Header from "$lib/Header.svelte";
</script>

<svelte:head>
  <style>
    @import "/static/main.scss";
  </style>
</svelte:head>

<div class="container">
  <div class="constraint">
    <Header />
    <slot />
  </div>
</div>

<style lang="scss">
  .container {
    display: flex;
    .constraint {
      width: 100vw;
      max-width: 80ch;
      border: solid 1px red;
      padding: 2rem 4rem;
    }
  }
</style>

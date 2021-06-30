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
    <content>
      <slot />
    </content>
  </div>
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    // position: fixed;
    .constraint {
      width: 96vw;
      max-width: 100ch;
      padding: 2rem 4rem;
    }
  }
</style>

<script lang="ts">
  import Footer from "$lib/Footer.svelte";
  import Header from "$lib/Header.svelte";
</script>

<svelte:head>
  <link href="/hint.min.css" rel="stylesheet" />
</svelte:head>

<div class="container">
  <Header />
  <main>
    <content>
      <slot />
    </content>
    <Footer />
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
    // min-height: 100vh;
    flex-direction: column;
  }
  content {
    flex: 1 0 auto;
  }
  footer {
    flex-shrink: 0;
  }
</style>

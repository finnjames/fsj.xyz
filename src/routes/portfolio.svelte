<svelte:head>
  <title>Portfolio - Finn James</title>
  <style>
    :root {
      --bg: black;
      --fg: white;
    }
  </style>
</svelte:head>

<div id="portfolio">
  <h1 id="photography" class="no-hash">Photography</h1>
  <img loading="lazy" alt="Eszter 1" src="/art/p-e2.webp" />
  <img loading="lazy" alt="Coulture" src="/art/p-c1.webp" />
  <img loading="lazy" alt="Thomas" src="/art/p-t1.webp" />
  <img loading="lazy" alt="Hannah" src="/art/p-h1.webp" />
  <img loading="lazy" alt="Eszter 2" src="/art/p-e1.webp" />
  <h1 id="drawing" class="no-hash">Drawing</h1>
  <img loading="lazy" alt="Charcoal drawing of my desk" class="image" src="/art/a-c1.webp" />
  <img loading="lazy" alt="Ink drawing in the style of Mucha" class="image" src="/art/a-i1.webp" />
  <img loading="lazy" alt="Charcoal drawings with a backlight" class="image" src="/art/a-c2.webp" />
</div>

<style lang="scss">
  h1 {
    padding-top: 2.4rem;
    margin-top: 0rem;
    &:first-of-type {
      padding-top: 1.4rem;
    }
  }
  img {
    max-height: 90vh;
    max-width: 100vw;
    margin-bottom: 2.8rem;
  }
  #portfolio {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
  }
</style>

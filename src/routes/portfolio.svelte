<svelte:head><title>Portfolio - Finn James</title></svelte:head>

<div id="portfolio">
  <h1 id="photography" class="no-hash">Photography</h1>
  <img alt="Eszter 1" src="/art/p-e2.jpeg" />
  <img alt="Thomas" src="/art/p-t1.jpeg" />
  <img alt="Hannah" src="/art/p-h1.jpeg" />
  <img alt="Eszter 2" src="/art/p-e1.jpeg" />
  <h1 id="drawing" class="no-hash">Drawing</h1>
  <img alt="Charcoal drawing of my desk" class="image" src="/art/a-c1.jpeg" />
  <img alt="Ink drawing in the style of Mucha" class="image" src="/art/a-i1.jpeg" />
  <img alt="Charcoal drawings with a backlight" class="image" src="/art/a-c2.jpeg" />
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
    height: auto;
    max-height: 90vh;
    max-width: 100vw;
    margin-bottom: 2.4rem;
  }
  #portfolio {
    display: flex;
    flex-direction: column;
    align-items: center;
    // background: black;
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
  }
</style>

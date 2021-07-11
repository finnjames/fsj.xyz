<script lang="ts">
  // TODO: why is this a problem?
  import Intro from "/src/markdown/intro.md";
</script>

<svelte:head>
  <title>Home - Finn James</title>
</svelte:head>

<div class="relative">
  <div class="half">
    <Intro />
  </div>
  <div id="splash" alt="me in a flight suit" />
</div>

<style lang="scss">
  .relative {
    position: relative;
  }
  #splash {
    background-image: url("/images/flight-suit.png");
    background-size: auto 900px;
    background-repeat: no-repeat;
    position: fixed;
    right: calc(-24rem + 40vw);
    top: 2.2rem;
    min-height: 50rem;
    height: calc(100vh - 2rem);
    width: 600px;
    z-index: -10;
    user-select: none;
  }
  .half {
    max-width: 22rem;
    height: auto;
  }
  @media screen and (max-width: 767px) {
    #splash {
      width: 100vw;
      position: relative;
      top: 0;
      left: 50%;
      right: 50%;
      min-height: 900px;
      margin-left: -50vw;
      margin-right: -50vw;
      display: block;
      background-position: calc(-300px + 50vw) 0;
    }
    .half {
      max-width: none !important;
    }
  }
</style>

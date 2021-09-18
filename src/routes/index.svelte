<script lang="ts">
  import Intro from "$markdown/intro.md"; // TODO: why is this a problem?

  let bg, splash, splashHelmet;

  const moveSplash = (event) => {
    splash.style.transform = `translateX(${-event.clientX / 80}px) translateY(${
      -event.clientY / 80
    }px)`;
    splashHelmet.style.transform = `translateX(${-event.clientX / 40}px) translateY(${
      -event.clientY / 40
    }px)`;
    bg.style.transform = `translateX(${-event.clientX / 160}px) translateY(${
      -event.clientY / 160
    }px)`;
  };
</script>

<svelte:window on:mousemove={moveSplash} />

<svelte:head>
  <title>Finn James</title>
  <meta
    name="description"
    content="I’m Finn, a frontend developer & illustrator. I also write software for telescopes."
  />
</svelte:head>

<div id="bg" bind:this={bg} />
<div class="relative">
  <div class="half">
    <Intro />
  </div>
  <div bind:this={splash} id="splash" alt="me in a flight suit" />
  <div bind:this={splashHelmet} id="splash-helmet" alt="floating helmet" />
</div>

<style lang="scss">
  #bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 102%;
    height: 102%;
    background: url("/images/iss.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    opacity: 40%;
    filter: contrast(80%);
  }
  .relative {
    position: relative;
  }
  #splash {
    background-image: url("/images/flight-suit-me.png");
    background-size: auto 900px;
    background-repeat: no-repeat;
    position: fixed;
    right: calc(-24rem + 40vw);
    top: 2.2rem;
    min-height: 50rem;
    height: calc(100vh - 2rem);
    width: 600px;
    user-select: none;
    pointer-events: none;
  }
  #splash-helmet {
    @extend #splash;
    background-image: url("/images/flight-suit-helmet.png");
  }
  @media (prefers-reduced-motion) {
    #bg,
    #splash,
    #splash-helmet {
      transform: none !important;
    }
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

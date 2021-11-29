<script lang="ts">
  import Intro from "$markdown/intro.md"; // TODO: why is this a problem?
  import { onMount } from "svelte";

  let bg: HTMLElement, splash: HTMLElement, helmet: HTMLElement;

  class Position {
    x: number;
    y: number;
    constructor(x: number, y: number) {
      this.setBoth(x, y);
    }
    setBoth(x: number, y: number): void {
      this.x = x;
      this.y = y;
    }
  }

  export let mousePos = new Position(0, 0),
    pos = new Position(0, 0);

  export let windowSize = {
    x: 0,
    y: 0
  };

  onMount(async () => {
    onWindowResize();
    (function animationLoop() {
      window.requestAnimationFrame(animationLoop);
      float();
    })();
  });

  const onMouseMove = (event: MouseEvent) => {
    mousePos.setBoth(event.clientX, event.clientY);
  };

  const onWindowResize = () => {
    windowSize = {
      x: window.innerWidth,
      y: window.innerHeight
    };
  };

  function float(): void {
    pos.setBoth(pos.x + (mousePos.x - pos.x) * 0.05, pos.y + (mousePos.y - pos.y) * 0.05);
    try {
      splash.style.transform = `translateX(${(windowSize.x - pos.x) / 20}px) translateY(${
        (windowSize.y - pos.y) / 40
      }px)`;
      helmet.style.transform = `translateX(${(windowSize.x - pos.x) / 10}px) translateY(${
        (windowSize.y - pos.y) / 20
      }px)`;
      bg.style.transform = `translateX(${(windowSize.x - pos.x) / 40}px) translateY(${
        (windowSize.y - pos.y) / 80
      }px)`;
    } catch (error) {
      pos.setBoth(0, 0);
    }
  }
</script>

<svelte:window on:mousemove={onMouseMove} on:resize={onWindowResize} />

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
  <div bind:this={helmet} id="splash-helmet" alt="floating helmet" />
</div>

<style lang="scss">
  #bg {
    position: fixed;
    top: -4%;
    left: -4%;
    width: 108%;
    height: 108%;
    background: url("/images/iss.webp");
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
    #splash-helmet {
      display: none;
    }
    .half {
      max-width: none !important;
    }
    #bg,
    #splash,
    #splash-helmet {
      transform: none !important;
    }
  }
</style>

<script lang="ts">
</script>

<div class="relative">
  <img id="splash" src="/images/flight-suit.png" alt="me in a flight suit" height="800" />
  <div class="half">
    <h1 id="hey">Hey!</h1>
    <p>My name is <span class="bold">Finn James</span>.</p>
    <p>
      I am a frontend developer and<br />
      amateur illustrator. I also<br />
      write <a href="https://github.com/radiolevity/threepio">software</a> for
      <a href="https://skynet.unc.edu">telescopes</a>.
    </p>

    <p><a href="https://github.com/radiolevity">github</a></p>
    <p><a href="https://polywork.fsj.xyz">polywork</a></p>

    <div style="height: 2rem" />
    <span id="pride">he/him</span>
  </div>
</div>

<style lang="scss">
  .relative {
    position: relative;
  }
  #splash {
    height: 92vh;
    min-height: 40rem;
    position: absolute;
    left: 28rem;
    top: -8rem;
    z-index: -10;
  }
  #pride {
    background-color: purple;
    border-radius: 16rem;
    padding: 0.4rem 0.8rem;
    transform: translateX(-20px);
    color: var(--bg);
    background-image: linear-gradient(
      60deg,
      #3d33ff 16.67%,
      #8f33ff 16.67%,
      #8f33ff 33.33%,
      #cc0092 33.33%,
      #cc0092 50%,
      #3d33ff 50%,
      #3d33ff 66.67%,
      #8f33ff 66.67%,
      #8f33ff 83.33%,
      #cc0092 83.33%,
      #cc0092 100%
    );
  }
  .half {
    max-width: 40ch;
  }
  #hey {
    font-weight: bold;
    font-size: 3.2rem;
    font-variation-settings: "wght" 800, "CASL" 1, "slnt" -15;
  }
  p {
    font-size: large;
  }

  .bold {
    font-variation-settings: "wght" 800;
  }
</style>

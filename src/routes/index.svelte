<script lang="ts">
  let barber = false;
</script>

<div class="relative">
  <img id="splash" src="/images/flight-suit.png" alt="me in a flight suit" height="800" />
  <div class="half">
    <h1 id="hey">Hey!</h1>
    <p>
      My name is <span class="bold">Finn James</span>. I live in <br />
      Chapel Hill, NC, and I use <br /><span class="pride">he/him</span> pronouns.
    </p>
    <p>
      I am a frontend developer and <br />
      amateur illustrator. I also <br />
      write <a href="https://github.com/radiolevity/threepio">software</a> for
      <a href="https://skynet.unc.edu">telescopes</a>.
    </p>

    <p><a href="https://github.com/radiolevity">github</a></p>
    <p><a href="https://polywork.fsj.xyz">polywork</a></p>

    <div style="height: 2rem" />
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
    user-select: none;
  }
  .pride {
    font-variation-settings: "wght" 800;
    font-weight: 800;
    background-clip: text;
    color: transparent;
    // background-size: 200% 200%;
    background-image: linear-gradient(
      -60deg,
      #3d33ff 0%,
      #8f33ff 16.67%,
      #cc0092 33.33%,
      #3d33ff 50%,
      #8f33ff 66.67%,
      #cc0092 83.33%,
      #3d33ff 100%
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
    line-height: 1.6rem;
  }

  .bold {
    font-variation-settings: "wght" 800;
  }
</style>

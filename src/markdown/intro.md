---
---

<h1 class="no-hash">Hey!</h1>

My name is <span class="bold hint--top hint--rounded" aria-label="he/him, please">Finn James</span>. How’s it going?

I am a frontend developer and amateur illustrator based in Chapel Hill, NC. I also write <a href="https://github.com/finnsjames/threepio">software</a> for <a href="https://skynet.unc.edu">telescopes</a>.

[GitHub](https://github.com/finnsjames) • [Twitter](https://twitter.com/finnsjames) • [Polywork](https://polywork.fsj.xyz)

<p style="padding-top: 0.8rem; transform: translateX(-1px)">
  <Email />
</p>

<script lang="ts">
  import Email from "$lib/Email.svelte"
</script>

<style lang="scss">
  h1 {
    font-weight: bold;
    font-size: 3.2rem;
    margin-top: 1rem;
    margin-bottom: 1.6rem;
    font-variation-settings: "wght" 800, "CASL" 1, "slnt" -15;
  }
  p {
    font-size: large;
    line-height: 1.6rem;
    margin-bottom: 1.6rem;
  }
  .hint--top {
    /* color: var(--bg); */
    &::before {
      border-top-color: var(--fg);
    }
    &::after {
      background-color: var(--fg);
      color: var(--bg);
      text-shadow: none !important;
    }
  }

  .bold {
    font-variation-settings: "wght" 800;
  }
</style>
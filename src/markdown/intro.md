---
---

<h1 class="no-hash">Hey!</h1>

My name is <span class="bold hint--top hint--rounded" aria-label="he/him, please">Finn James</span>. How’s it going?

I am a software engineer and amateur artist based in Chapel Hill, NC. I also build <a href="https://github.com/finnsjames/threepio">systems</a> for <a href="https://skynet.unc.edu">telescopes</a>.

[GitHub](https://github.com/finnsjames) • [Twitter](https://twitter.com/finnsjames) • [Instagram](https://instagram.com/notafinnsta) 


<p class="email-wrapper">
  <Email />
</p>

<script lang="ts">
  import Email from "$lib/Email.svelte"
</script>

<style lang="scss">
  p {
    text-shadow: 0 0 2.2rem var(--bg);
  }
  h1 {
    font-weight: bold;
    font-size: 3.2rem;
    margin-top: 1rem;
    margin-bottom: 1.6rem;
    font-variation-settings: "wght" var(--font-weight-bold), "CASL" 1, "slnt" -15;
  }
  a {
    color: var(--medium-purple);
  }
  p {
    font-size: large;
    line-height: 1.6rem;
    margin-bottom: 1.6rem;
  }
  .hint--top {
    font-family: "RecVar" !important;
    &::before {
      border-top-color: var(--fg);
    }
    &::after {
      font-family: "RecVar", sans-serif;
      font-variation-settings: "wght" 550;
      background-color: var(--fg);
      color: var(--bg);
      text-shadow: none !important;
    }
  }
  .email-wrapper {
    margin-top: 2.4rem;
    transform: translateX(-1px);
  }
  @media screen and (max-width: 767px) {
    .email-wrapper {
      transform: none;
    }
  }

  .bold {
    font-variation-settings: "wght" var(--font-weight-bold);
  }
</style>

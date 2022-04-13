<script lang="ts">
  const email = hex2a("6865794066736a2e78797a"); // hex email address

  function hex2a(hex: string): string {
    let str = "";
    for (var i = 0; i < hex.length; i += 2) {
      str += String.fromCharCode(parseInt(hex.slice(i, i + 2), 16));
    }
    return str;
  }

  let address: any;

  let copyIcon = `<svg xmlns="http://www.w3.org/2000/svg" style="overflow: visible" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
</script>

<div id="email-container" href="#">
  <label id="email-label" for="email">email</label>
  <div id="address-wrapper">
    <input
      id="email"
      name="email"
      type="email"
      bind:this={address}
      value={email}
      on:focus={address.select()}
      readonly
    />
  </div>

  <button
    id="copy"
    aria-label="copy email address"
    on:click={() => {
      address.select();
      navigator.clipboard.writeText(email);
    }}
  >
    <div id="copy-front">
      <svg height="24" width="24">
        {@html copyIcon}
      </svg>
    </div>
  </button>
</div>

<style lang="scss">
  #email-container {
    border: none;
    background-color: transparent;
    border-radius: 0.8rem;
    font-family: inherit;
    font-size: inherit;
    position: relative;
    padding: 0;
    height: 3.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--white);
    width: 100%;
    max-width: 19rem;
  }
  @media screen and(max-width: 767px) {
    #email-container {
      max-width: none;
    }
  }
  #email-label {
    background-color: var(--med-dark-magenta);
    border-radius: 0.8rem 0 0 0.8rem;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    height: 100%;
  }
  #address-wrapper {
    background: var(--magenta);
    padding: 0 1rem;
    height: 100%;
    display: flex;
    flex: auto;
    align-items: center;
  }
  input {
    background: transparent;
    border: none;
    width: 8rem;
    min-width: 8rem;
    color: var(--white);
    text-align: center;
  }
  #copy {
    border-radius: 0 0.8rem 0.8rem 0;
    border: none;
    height: 100%;
    width: 51px;
    position: relative;
    cursor: pointer;
    background-color: transparent;
    perspective: 100px;
    color: inherit;
  }
  #copy-front {
    border-radius: inherit;
    border: none;
    padding: inherit;
    height: inherit;
    background: var(--magenta);
    display: flex;
    justify-content: center;
    position: absolute;
    right: 0;
    top: 0;
    width: inherit;
    align-items: center;
    will-change: transform, filter;
    transform: translateY(0px);
    filter: brightness(100%);
  }
  #copy:hover #copy-front {
    transform-style: preserve-3d;
    transform-origin: left;
    animation: wobble 800ms cubic-bezier(0.3, 0.7, 0.4, 1.6);
    filter: brightness(100%);
    transition: transform 200ms cubic-bezier(0.3, 0.7, 0.4, 1.6),
      filter 200ms cubic-bezier(0.3, 0.7, 0.4, 1.6);
  }
  @keyframes wobble {
    0% {
      transform: rotateY(0deg);
      filter: brightness(100%);
    }
    25% {
      transform: rotateY(32deg);
      filter: brightness(108%);
    }
    50% {
      transform: rotateY(-8deg);
      filter: brightness(98%);
    }
    75% {
      transform: rotateY(8deg);
      filter: brightness(102%);
    }
    100% {
      transform: rotateY(0deg);
      filter: brightness(100%);
    }
  }
  #copy:active {
    #copy-front {
      transform: rotateY(24deg);
      filter: brightness(106%);
    }
  }
</style>

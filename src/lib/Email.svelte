<script lang="ts">
  import { select_multiple_value } from "svelte/internal";

  const email = hex2a("6865794066736a2e78797a"); // hex email address

  const copy = () => {
    navigator.clipboard.writeText(email);
  };

  function hex2a(hexx) {
    var hex = hexx.toString(); //force conversion
    var str = "";
    for (var i = 0; i < hex.length; i += 2) {
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
  }

  let address: any;
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
    on:click={() => {
      address.select();
      document.execCommand("copy");
    }}
  >
    <div id="copy-front">
      <img alt="copy email address" src="/icons/copy.svg" height="24" width="24" />
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
    img {
      transform-style: preserve-3d;
    }
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

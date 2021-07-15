<script>
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

  let address;
</script>

<button id="email-container" href="#">
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

  <div
    id="copy"
    on:click={() => {
      address.select();
      address.setSelectionRange(0, 99999); /* For mobile devices */
      document.execCommand("copy");
    }}
  >
    <div id="copy-front">
      <img alt="copy email address" src="/icons/copy.svg" />
    </div>
  </div>
</button>

<style lang="scss">
  #email-container {
    border: none;
    background-color: var(--magenta);
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
    background-color: var(--dark-magenta);
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
    align-items: center;
  }
  input {
    background: transparent;
    border: none;
    width: 12ch;
    color: var(--white);
    text-align: center;
  }
  #copy {
    border-radius: 0 0.8rem 0.8rem 0;
    height: 100%;
    width: 51px;
    cursor: pointer;
    background-color: var(--dark-purple);
    background-image: linear-gradient(
      to right,
      var(--dark-magenta) calc(100% - 0.8rem),
      var(--darker-magenta) 100%
    );
  }
  #copy-front {
    border-radius: inherit;
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
    transition: transform 420ms cubic-bezier(0.3, 0.7, 0.4, 1),
      filter 420ms cubic-bezier(0.3, 0.7, 0.4, 1);
    transform: translateY(0px);
    filter: brightness(100%);
  }
  #copy:hover #copy-front {
    transform: translateY(-8px);
    transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.6),
      filter 250ms cubic-bezier(0.3, 0.7, 0.4, 1);
    filter: brightness(120%);
  }
  #copy:active {
    #copy-front {
      transform: translateY(-4px);
      transition: transform 42ms;
    }
  }
</style>

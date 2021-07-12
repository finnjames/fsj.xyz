<script>
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
</script>

<button id="email" on:click={copy}>
  <div id="email-front">
    email: {email}
  </div>
</button>

<style lang="scss">
  #email {
    border: none;
    border-radius: 0.8rem;
    cursor: pointer;
    font-family: inherit;
    font-size: inherit;
    position: relative;
    padding: 0;
    height: 3rem;
    display: flex;
    align-items: center;
    background-color: var(--dark-purple);
    background-image: linear-gradient(
      to right,
      var(--darker-purple) 0,
      var(--dark-purple) 1rem,
      var(--dark-purple) calc(100% - 1rem),
      var(--darker-purple) 100%
    );
  }
  #email-front {
    padding: 0.6rem 1.2rem;
    border-radius: inherit;
    color: var(--white);
    height: inherit;
    background: var(--purple);
    display: flex;
    align-items: center;
    will-change: transform, filter;
    transition: transform 420ms cubic-bezier(0.3, 0.7, 0.4, 1),
      filter 420ms cubic-bezier(0.3, 0.7, 0.4, 1);
    transform: translateY(-4px);
    filter: brightness(100%);
  }
  #email:hover #email-front {
    transform: translateY(-8px);
    transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.6),
      filter 250ms cubic-bezier(0.3, 0.7, 0.4, 1);
    filter: brightness(110%);
  }
  #email:active #email-front {
    transform: translateY(-4px);
    transition: transform 42ms;
  }
</style>

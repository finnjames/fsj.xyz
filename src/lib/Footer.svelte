<footer>
  <div>
    This work licensed under
    <a href="https://creativecommons.org/licenses/by-nc-sa/4.0">CC BY-NC-SA 4.0</a>
  </div>
  <div>
    Source code for this site on <a href="https://github.com/finnsjames/fsj.xyz">GitHub</a>
  </div>
</footer>

<style lang="scss">
  footer {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    color: var(--med-light-gray);
    a {
      color: var(--med-gray);
      &:hover {
        color: var(--med-dark-gray);
      }
      &:active {
        color: var(--dark-gray);
      }
    }
    &,
    div {
      text-align: center;
      margin: 0;
      padding-bottom: 1rem;
    }
  }
</style>

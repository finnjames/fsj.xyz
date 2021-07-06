<script context="module">
  export const load = ({ error, status }) => {
    return {
      props: {
        error,
        status
      }
    };
  };
</script>

<script lang="ts">
  export let error: any;
  export let status: any;
</script>

<h1>{status}</h1>
<p>{error.message}</p>
<p>
  What’s next? <a href="/">Go back home</a> or <a href="/contact">tell me about this error</a>.
</p>

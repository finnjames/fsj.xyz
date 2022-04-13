<script context="module">
  const allPosts = import.meta.glob("./*.md");

  // console.log(allPosts);
  let promisedPosts = [];
  for (let path in allPosts) {
    promisedPosts.push(
      allPosts[path]().then(({ metadata }) => {
        console.log(metadata);
        return { path, metadata };
      })
    );
  }
  export const load = async () => {
    let posts = await Promise.all(promisedPosts);
    posts = posts.sort((a, b) => a.metadata.date - b.metadata.date);

    return {
      props: {
        posts: posts
      }
    };
  };
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
</script>

<script>
  export let posts;
</script>

<svelte:head>
  <title>Posts - Finn James</title>
</svelte:head>

<h1>Posts</h1>

<ul class="posts">
  {#each posts.reverse() as { path, metadata: { title, date, snippet } }}
    <li>
      <h2>
        <a sveltekit:prefetch href={`/posts/${path.replace(".md", "").replace(".svx", "")}`}
          >{title}</a
        >
      </h2>
      <p>
        {snippet}
      </p>
      <p class="med-gray">
        {(() => {
          let d = new Date(date);
          return ` ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
        })()}
      </p>
    </li>
  {/each}
</ul>

<style lang="scss">
  .posts {
    list-style: none;
    padding: 0;
    li {
      padding: 1rem;
      padding-left: 0;
      p {
        padding: 0;
        margin-top: 0;
        color: var(--fg);
        &.med-gray {
          color: var(--med-gray);
        }
      }
    }
  }
</style>

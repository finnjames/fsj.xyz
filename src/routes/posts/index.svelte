<script context="module">
  const allPosts = import.meta.glob("./*.md");

  let promisedPosts = [];
  for (let path in allPosts) {
    promisedPosts.push(
      allPosts[path]().then(({ metadata }) => {
        return { path, metadata };
      })
    );
  }
  export const load = async () => {
    const posts = await Promise.all(promisedPosts);
    console.log(posts);

    return {
      props: {
        posts: posts.sort((a, b) => {
          // d = new Date();
          Date.parse(b.metadata.date) - Date.parse(a.metadata.date);
        })
      }
    };
  };
</script>

<script>
  export let posts;
</script>

<svelte:head>
  <title>Posts - Finn James</title>
</svelte:head>

<h1>Posts</h1>

<div class="posts">
  {#each posts as { path, metadata: { title } }}
    <div class="post">
      <h3>
        <a sveltekit:prefetch href={`/posts/${path.replace(".md", "").replace(".svx", "")}`}
          >{title}</a
        >
      </h3>
    </div>
  {/each}
</div>

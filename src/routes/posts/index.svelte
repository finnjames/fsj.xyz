<script context="module">
  const allPosts = import.meta.glob("./*.md");

  // console.log(allPosts);
  let promisedPosts = [];
  for (let path in allPosts) {
    promisedPosts.push(
      allPosts[path]().then(({ metadata }) => {
        // console.log(metadata);
        return { path, metadata };
      })
    );
  }
  export const load = async () => {
    let posts = await Promise.all(promisedPosts);
    posts = posts.sort((a, b) => Date.parse(b.metadata.date) - Date.parse(a.metadata.date));
    // console.log(posts);

    return {
      props: {
        posts: posts
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

<ul class="posts">
  {#each posts.reverse() as { path, metadata: { title, date } }}
    <li>
      <p>
        <a sveltekit:prefetch href={`/posts/${path.replace(".md", "").replace(".svx", "")}`}
          >{title}</a
        >
      </p>
      <!-- <p>{date}</p> -->
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
        color: var(--med-gray);
      }
    }
  }
</style>

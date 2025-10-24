<script>
  let { children } = $props();
</script>

<svelte:head>
  <meta
    name="description"
    content="Fayden World is Alfayed Dennita's main personal website that contains public personal information, such as personal description, software development portfolio, art gallery, and contact details."
  />
  <meta
    name="keywords"
    content="Alfayed Dennita, Muhammad Alfayed Dennita, Fayden, Fayden World, personal, portfolio, projects, contacts"
  />
  <title>Fayden World - Alfayed Dennita's Personal Website</title>
</svelte:head>

{@render children?.()}

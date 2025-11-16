<script>
  const { class: className, children, ...props } = $props();
</script>

<ul class={['project-cards', className]} {...props}>
  {@render children?.()}
</ul>

<style>
  .project-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: stretch;
    gap: 40px;
    list-style: none;
  }
</style>

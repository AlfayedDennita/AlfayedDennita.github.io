<script>
  const { class: className, children, ...props } = $props();
</script>

<ul class={['project-cards', className]} {...props}>
  {@render children?.()}
</ul>

<style>
  .project-cards {
    display: flex;
    justify-content: center;
    align-items: stretch;
    flex-wrap: wrap;
    gap: 40px;
    list-style: none;
  }
</style>

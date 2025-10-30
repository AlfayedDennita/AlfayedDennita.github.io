<script>
  import ErrorLoad from './ErrorLoad.svelte';

  const { children } = $props();
</script>

<div class="project-cards">
  {#if children}
    {@render children()}
  {:else}
    <ErrorLoad message="Failed to load projects." />
  {/if}
</div>

<style>
  .project-cards {
    display: flex;
    justify-content: center;
    align-items: stretch;
    flex-wrap: wrap;
    gap: 40px;
    padding-inline: 32px;
  }
</style>

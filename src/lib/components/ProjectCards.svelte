<script>
  const { children } = $props();
</script>

<div class="project-cards">
  {#if children}
    {@render children()}
  {:else}
    <div class="project-cards__empty-message">
      <i class="project-cards__empty-message-icon hn hn-octagon-times-solid"
      ></i>
      <p>Failed to load projects.</p>
    </div>
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

  .project-cards__empty-message {
    flex-grow: 1;
    height: 512px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 16px;
    background-color: rgba(var(--color-white-alt-1-rgb), 0.5);
    border-radius: 8px;
    color: rgba(var(--color-black-alt-1-rgb), 0.25);
    user-select: none;
  }

  .project-cards__empty-message-icon {
    font-size: var(--font-size-heading-3);
  }
</style>

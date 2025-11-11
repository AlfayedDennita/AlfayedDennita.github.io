<script>
  import Button from '$lib/components/ui/Button.svelte';

  let {
    class: className,
    currentPage = $bindable(1),
    totalPages = 1,
    totalNeighbours = 2,
  } = $props();

  const pages = $derived.by(() => {
    if (totalPages < 1) {
      return [];
    }

    const maxPage = totalPages;

    let buttons = [];

    if (currentPage - totalNeighbours > 1) {
      buttons.push(1);
    }

    if (currentPage - totalNeighbours > 2) {
      buttons.push('...');
    }

    for (let page = currentPage - totalNeighbours; page < maxPage; page++) {
      if (
        page >= 1 &&
        currentPage - totalNeighbours <= page &&
        page <= currentPage + totalNeighbours
      ) {
        buttons.push(page);
      } else {
        continue;
      }
    }

    if (currentPage + totalNeighbours + 1 < maxPage) {
      buttons.push('...');
    }

    buttons.push(maxPage);

    return buttons;
  });
</script>

<ul class={['pagination', className]}>
  {#each pages as page}
    <li>
      {#if Number.isInteger(page)}
        <Button
          theme={currentPage === page ? 'secondary' : 'primary'}
          title={`Go to Page ${page}`}
          square
          onclick={() => (currentPage = page)}
        >
          {page}
        </Button>
      {:else}
        <span>{page}</span>
      {/if}
    </li>
  {/each}
</ul>

<style>
  .pagination {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 8px;
    list-style: none;
  }
</style>

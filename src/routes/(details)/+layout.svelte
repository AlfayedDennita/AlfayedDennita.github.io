<script>
  import { getContext } from 'svelte';
  import DetailsMain from '$lib/components/DetailsMain.svelte';

  const { children } = $props();

  const getHeaderOffsetHeight = getContext('header-offset-height');
  const getFooterOffsetHeight = getContext('footer-offset-height');
</script>

<DetailsMain
  headerOffsetHeight={getHeaderOffsetHeight()}
  footerOffsetHeight={getFooterOffsetHeight()}
>
  {@render children?.()}
</DetailsMain>

<script>
  const {
    class: className,
    message = 'Something went wrong.',
    ...props
  } = $props();
</script>

<div class={['error-load', className]} {...props}>
  <i class="hn hn-octagon-times-solid error-load__icon"></i>
  <p>{message}</p>
</div>

<style>
  .error-load {
    flex-grow: 1;
    justify-self: stretch;
    align-self: stretch;
    min-height: 512px;
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

  .error-load__icon {
    font-size: var(--font-size-heading-3);
  }
</style>

<script>
  const tags = ['input', 'textarea'];
  const {
    tag = 'input',
    iconLeft,
    iconRight,
    height,
    resize,
    ...props
  } = $props();
</script>

<div
  class={[
    'input',
    iconLeft && 'input--icon-left',
    iconRight && 'input--icon-right',
  ]}
>
  {#if iconLeft}
    <span class="input__icon-left">
      {@render iconLeft?.()}
    </span>
  {/if}
  <svelte:element
    this={tags.includes(tag) ? tag : tags[0]}
    class="input__field"
    style:height
    style:resize
    {...props}
  />
  {#if iconRight}
    <span class="input__icon-right">
      {@render iconRight?.()}
    </span>
  {/if}
</div>

<style>
  .input {
    --border-color: var(--color-white-alt-1);
    --box-shadow-color: var(--color-white-alt-2);

    position: relative;
    display: flex;
    border: 2px solid var(--border-color);
    box-shadow: -4px 4px var(--box-shadow-color);
    border-radius: 4px;
    transition:
      box-shadow 0.25s,
      border 0.25s;
  }

  .input:hover {
    box-shadow: -6px 6px var(--box-shadow-color);
  }

  .input:has(.input__field:focus) {
    --border-color: var(--color-white-alt-2);

    box-shadow: -6px 6px var(--box-shadow-color);
  }

  .input__field {
    --padding-x: 16px;

    flex-grow: 1;
    min-width: 240px;
    min-height: 48px;
    padding: 8px var(--padding-x);
    background-color: var(--color-white-pure);
    border: none;
    outline: none;
    color: var(--color-black-pure);
  }

  .input__field::placeholder {
    color: var(--color-black-alt-2);
  }

  .input--icon-left .input__field {
    padding-left: calc(var(--padding-x) * 3);
  }

  .input--icon-right .input__field {
    padding-right: calc(var(--padding-x) * 3);
  }

  .input__icon-left {
    position: absolute;
    left: 16px;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    color: var(--color-black-alt-2);
    pointer-events: none;
  }

  .input__icon-right {
    position: absolute;
    right: 16px;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    color: var(--color-black-alt-2);
    pointer-events: none;
  }
</style>

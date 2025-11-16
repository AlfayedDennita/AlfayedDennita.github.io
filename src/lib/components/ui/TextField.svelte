<script>
  const types = [
    'text',
    'password',
    'email',
    'number',
    'search',
    'tel',
    'url',
    'date',
    'week',
    'time',
    'datetime-local',
    'textarea',
  ];

  const {
    class: className,
    fieldClass,
    type = types[0],
    iconLeft,
    iconRight,
    ...props
  } = $props();

  const finalType = $derived.by(() => {
    if (type === 'textarea') {
      return undefined;
    } else if (types.includes(type)) {
      return type;
    } else {
      return types[0];
    }
  });
</script>

<div
  class={['text-field', className]}
  class:text-field--has-icon-left={iconLeft}
  class:text-field--has-icon-right={iconRight}
>
  {#if iconLeft}
    <span class="text-field__icon text-field__icon--position--left">
      {@render iconLeft()}
    </span>
  {/if}
  <svelte:element
    this={type === 'textarea' ? 'textarea' : 'input'}
    class={['text-field__field', fieldClass]}
    class:text-field__field--type--textarea={type === 'textarea'}
    type={finalType}
    {...props}
  />
  {#if iconRight}
    <span class="text-field__icon text-field__icon--position--right">
      {@render iconRight()}
    </span>
  {/if}
</div>

<style>
  .text-field {
    position: relative;
    display: inline-flex;
    border: 2px solid var(--color-white-alt-1);
    border-radius: 4px;
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: -4px 4px var(--color-white-alt-2);
    transition:
      border-color 0.25s,
      outline-color 0.25s,
      box-shadow 0.25s;
  }

  .text-field:hover {
    box-shadow: -6px 6px var(--color-white-alt-2);
  }

  .text-field:has(.text-field__field:focus) {
    border-color: var(--color-white-alt-2);
    outline-color: var(--color-black-alt-2);
    box-shadow: 0 0 transparent;
  }

  .text-field__field {
    --padding-x: 16px;

    flex-grow: 1;
    min-width: 160px;
    height: 48px;
    padding: 8px var(--padding-x);
    background-color: var(--color-white-pure);
    border: none;
    outline: none;
    font-family: var(--font-family-sans);
    font-size: var(--font-size-paragraph);
    color: var(--color-black-pure);
  }

  .text-field__field--type--textarea {
    min-height: 128px;
    height: auto;
    padding-block: 16px;
  }

  .text-field__field::placeholder {
    color: var(--color-black-alt-2);
  }

  .text-field--has-icon-left .text-field__field {
    padding-left: calc(var(--padding-x) * 3);
  }

  .text-field--has-icon-right .text-field__field {
    padding-right: calc(var(--padding-x) * 3);
  }

  .text-field__icon {
    position: absolute;
    inset-block: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: var(--color-black-alt-2);
    pointer-events: none;
  }

  .text-field__icon--position--left {
    left: 16px;
  }

  .text-field__icon--position--right {
    right: 16px;
  }
</style>

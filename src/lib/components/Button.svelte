<script>
  const styles = ['primary', 'secondary', 'neutral'];
  const {
    tag = 'button',
    style = styles[0],
    isSquare = false,
    children,
    ...props
  } = $props();
</script>

<svelte:element
  this={tag}
  class={[
    'button',
    `button--style-${styles.includes(style) ? style : styles[0]}`,
    isSquare && 'button--type-square',
  ]}
  {...props}
>
  <div class="button__container">
    {@render children?.()}
  </div>
</svelte:element>

<style>
  .button {
    --drop-shadow-color: var(--color-primary-shadow);
    --drop-shadow: 0 4px 0 0 var(--drop-shadow-color);
    --outline-shadow-color: var(--color-secondary-main);
    --outline-shadow: 0 0 0 0 transparent;
    --underline-color: transparent;

    position: relative;
    min-width: 48px;
    min-height: 48px;
    display: flex;
    padding: 2px;
    background-color: var(--color-primary-main);
    border: none;
    box-shadow:
      inset 0 0 0 2px var(--drop-shadow-color),
      var(--drop-shadow),
      var(--outline-shadow);
    border-radius: 4px;
    color: var(--color-white-pure);
    font-family: var(--font-family-pixel);
    font-size: var(--font-size-paragraph);
    text-transform: uppercase;
    text-decoration: underline wavy var(--underline-color) 1px;
    text-underline-offset: 2px;
    cursor: pointer;
    transition:
      box-shadow 0.25s,
      text-decoration 0.25s,
      transform 0.25s;
  }

  .button--style-secondary {
    --drop-shadow-color: var(--color-secondary-shadow);
    --outline-shadow-color: var(--color-black-alt-1);

    background-color: var(--color-secondary-main);
    color: var(--color-black-pure);
  }

  .button--style-neutral {
    --drop-shadow-color: var(--color-white-alt-2);
    --outline-shadow-color: var(--color-black-alt-2);

    background-color: var(--color-white-alt-1);
    color: var(--color-black-pure);
  }

  .button::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -4px;
    height: 4px;
  }

  .button:focus-visible {
    --outline-shadow: 0 8px 0 0 var(--outline-shadow-color);
    --underline-color: var(--color-secondary-highlight);

    outline: none;
  }

  .button--style-secondary:focus-visible {
    --underline-color: var(--color-black-alt-1);
  }

  .button--style-neutral:focus-visible {
    --underline-color: var(--color-black-alt-2);
  }

  .button:active {
    --drop-shadow: 0 0 0 0 transparent;
    --outline-shadow: 0 0 0 0 transparent;

    transform: translateY(4px);
  }

  .button:focus-visible:active {
    transform: translateY(6px);
  }

  .button__container {
    --inset-shadow-color: var(--color-primary-highlight);
    --inset-shadow-color-alpha: rgba(var(--color-primary-highlight-rgb), 0.2);

    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 4px 20px;
    box-shadow:
      inset 0 0 0 1px var(--inset-shadow-color-alpha),
      inset 0 3px 0 0 var(--inset-shadow-color);
    border-radius: 2px;
    transition: box-shadow 0.25s;
  }

  .button--style-secondary .button__container {
    --inset-shadow-color: var(--color-secondary-highlight);
    --inset-shadow-color-alpha: rgba(var(--color-secondary-highlight-rgb), 0.4);
  }

  .button--style-neutral .button__container {
    --inset-shadow-color: var(--color-white-pure);
    --inset-shadow-color-alpha: rgba(var(--color-white-pure-rgb), 0.4);
  }

  .button:is(:hover, :active) .button__container {
    --inset-shadow-color-alpha: var(--inset-shadow-color);
  }

  .button--type-square .button__container {
    padding: 4px;
  }
</style>

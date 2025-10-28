<script>
  const themes = ['primary', 'secondary', 'neutral'];
  const {
    tag = 'button',
    theme = themes[0],
    class: className,
    isSquare = false,
    children,
    ...props
  } = $props();
</script>

<svelte:element
  this={tag}
  class={[
    'button',
    `button--theme-${themes.includes(theme) ? theme : themes[0]}`,
    isSquare && 'button--type-square',
    className,
  ]}
  {...props}
>
  <div class="button__container">
    {@render children?.()}
  </div>
</svelte:element>

<style>
  .button {
    --shadow-color: var(--color-primary-shadow);
    --background-color: var(--color-primary-main);
    --outline-color: var(--color-primary-main);

    display: inline-block;
    padding: 2px 2px 6px 2px;
    background-color: var(--shadow-color);
    border: none;
    border-radius: 4px;
    outline: 2px solid transparent;
    outline-offset: 2px;
    color: var(--color-white-pure);
    font-family: var(--font-family-pixel);
    font-size: var(--font-size-paragraph);
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    transition:
      padding 0.25s,
      margin 0.25s,
      outline 0.25s;
  }

  .button--theme-secondary {
    --shadow-color: var(--color-secondary-shadow);
    --background-color: var(--color-secondary-main);
    --outline-color: var(--color-secondary-main);

    color: var(--color-black-pure);
  }

  .button--theme-neutral {
    --shadow-color: var(--color-white-alt-2);
    --background-color: var(--color-white-alt-1);
    --outline-color: var(--color-black-alt-2);

    color: var(--color-black-pure);
  }

  .button:focus-visible {
    outline-color: var(--outline-color);
  }

  .button:active {
    margin-top: 4px;
    padding: 2px;
  }

  .button__container {
    --inset-shadow-color: var(--color-primary-highlight);
    --inset-shadow-color-alpha: rgba(var(--color-primary-highlight-rgb), 0.2);

    min-width: 48px;
    min-height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 4px 20px;
    background-color: var(--background-color);
    border-radius: 2px;
    box-shadow:
      inset 0 3px 0 0 var(--inset-shadow-color),
      inset 0 0 0 1px var(--inset-shadow-color-alpha);
    transition: box-shadow 0.25s;
  }

  .button--theme-secondary .button__container {
    --inset-shadow-color: var(--color-secondary-highlight);
    --inset-shadow-color-alpha: rgba(var(--color-secondary-highlight-rgb), 0.4);
  }

  .button--theme-neutral .button__container {
    --inset-shadow-color: var(--color-white-pure);
    --inset-shadow-color-alpha: rgba(var(--color-white-pure-rgb), 0.4);
  }

  .button:is(:hover, :focus-visible, :active) .button__container {
    --inset-shadow-color-alpha: var(--inset-shadow-color);
  }

  .button--type-square .button__container {
    padding: 4px;
  }
</style>

<script>
  const types = ['button', 'submit', 'reset'];
  const themes = ['primary', 'secondary', 'neutral'];

  const {
    class: className,
    type = types[0],
    href,
    theme = themes[0],
    square = false,
    children,
    ...props
  } = $props();

  const finalType = $derived.by(() => {
    if (href) {
      return undefined;
    } else if (types.includes(type)) {
      return type;
    } else {
      return types[0];
    }
  });
</script>

<svelte:element
  this={href ? 'a' : 'button'}
  class={[
    'button',
    `button--theme--${themes.includes(theme) ? theme : themes[0]}`,
    className,
  ]}
  class:button--square={square}
  type={finalType}
  {href}
  {...props}
>
  <div class="button__inner">
    {@render children?.()}
  </div>
</svelte:element>

<style>
  .button {
    --shadow-color: var(--color-primary-shadow);
    --background-color: var(--color-primary-main);
    --outline-color: var(--color-primary-main);

    display: inline-block;
    padding: 2px 2px 6px;
    background-color: var(--shadow-color);
    border: none;
    border-radius: 4px;
    outline: 2px solid transparent;
    outline-offset: 2px;
    font-family: var(--font-family-pixel);
    font-size: var(--font-size-paragraph);
    text-align: center;
    text-transform: uppercase;
    text-decoration: none;
    color: var(--color-white-pure);
    cursor: pointer;
    transition:
      opacity 0.25s,
      margin-top 0.25s,
      padding-bottom 0.25s,
      outline-color 0.25s;
  }

  .button--theme--secondary {
    --shadow-color: var(--color-secondary-shadow);
    --background-color: var(--color-secondary-main);
    --outline-color: var(--color-secondary-main);

    color: var(--color-black-pure);
  }

  .button--theme--neutral {
    --shadow-color: var(--color-white-alt-2);
    --background-color: var(--color-white-alt-1);
    --outline-color: var(--color-black-alt-2);

    color: var(--color-black-pure);
  }

  .button:focus-visible {
    outline-color: var(--outline-color);
  }

  .button:not(:disabled):active {
    margin-top: 4px;
    padding-bottom: 2px;
  }

  .button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .button__inner {
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

  .button--square .button__inner {
    width: 48px;
    height: 48px;
    padding: 4px;
  }

  .button--theme--secondary .button__inner {
    --inset-shadow-color: var(--color-secondary-highlight);
    --inset-shadow-color-alpha: rgba(var(--color-secondary-highlight-rgb), 0.4);
  }

  .button--theme--neutral .button__inner {
    --inset-shadow-color: var(--color-white-pure);
    --inset-shadow-color-alpha: rgba(var(--color-white-pure-rgb), 0.4);
  }

  .button:not(:disabled):is(:hover, :focus-visible, :active) .button__inner {
    --inset-shadow-color-alpha: var(--inset-shadow-color);
  }
</style>

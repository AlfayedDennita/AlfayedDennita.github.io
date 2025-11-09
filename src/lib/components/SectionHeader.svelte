<script>
  const {
    class: className,
    sectionId,
    shadow = false,
    icon,
    subtitle,
    titleLeft,
    titleRight,
    children,
    ...props
  } = $props();
</script>

<div class={['section-header', className]} {...props}>
  {#each { length: shadow ? 2 : 1 }, i}
    <svelte:element
      this={i === 0 ? 'header' : 'div'}
      class="section-header__inner"
      class:section-header__inner--overlay={shadow && i === 0}
      aria-hidden={i === 1}
    >
      <div class="section-header__title">
        {#if icon}
          <i class={['hn', `hn-${icon}`, 'section-header__title-icon']}></i>
        {/if}
        <svelte:element
          this={i === 0 ? 'h2' : 'p'}
          class="section-header__title-text"
          id={i === 0 ? `${sectionId}-title` : undefined}
        >
          {#if titleLeft}
            <span class="section-header__title-text-left"
              >{@render titleLeft()}</span
            >
          {/if}
          {#if children}
            <span class="section-header__title-text-center"
              >{@render children()}</span
            >
          {/if}
          {#if titleRight}
            <span class="section-header__title-text-right"
              >{@render titleRight()}</span
            >
          {/if}
        </svelte:element>
      </div>
      {#if subtitle}
        <p class="section-header__subtitle">
          {subtitle}
        </p>
      {/if}
    </svelte:element>
  {/each}
</div>

<style>
  .section-header {
    position: relative;
  }

  .section-header__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    text-align: center;
    user-select: none;
  }

  .section-header__inner--overlay {
    z-index: 1;
    position: absolute;
    top: 0;
    inset-inline: 0;
    user-select: auto;
  }

  .section-header__title {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .section-header__title-icon {
    font-size: var(--font-size-heading-3);
  }

  .section-header__inner--overlay .section-header__title-icon {
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'  fill='%23000000'%3E%3Cpath d='M12 0h18v6h6v6h6v18h-6v6h-6v6H12v-6H6v-6H0V12h6V6h6V0zm12 6h-6v6h-6v6H6v6h6v6h6v6h6v-6h6v-6h6v-6h-6v-6h-6V6zm-6 12h6v6h-6v-6zm24 24h6v6h-6v-6z'%3E%3C/path%3E%3C/svg>");
    background-size: 4px;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }

  .section-header__title-text {
    display: flex;
    align-items: center;
    font-family: var(--font-family-pixel);
    font-size: var(--font-size-heading-3);
    font-weight: bold;
  }

  .section-header__title-text-left {
    color: var(--color-primary-main);
  }

  .section-header__inner--overlay .section-header__title-text-left {
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' fill='%23268fd9'%3E%3Cpath d='M12 0h18v6h6v6h6v18h-6v6h-6v6H12v-6H6v-6H0V12h6V6h6V0zm12 6h-6v6h-6v6H6v6h6v6h6v6h6v-6h6v-6h6v-6h-6v-6h-6V6zm-6 12h6v6h-6v-6zm24 24h6v6h-6v-6z'%3E%3C/path%3E%3C/svg>");
    background-size: 4px;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }

  .section-header__inner--overlay .section-header__title-text-center {
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' fill='%23000000'%3E%3Cpath d='M12 0h18v6h6v6h6v18h-6v6h-6v6H12v-6H6v-6H0V12h6V6h6V0zm12 6h-6v6h-6v6H6v6h6v6h6v6h6v-6h6v-6h6v-6h-6v-6h-6V6zm-6 12h6v6h-6v-6zm24 24h6v6h-6v-6z'%3E%3C/path%3E%3C/svg>");
    background-size: 4px;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }

  .section-header__title-text-right {
    color: var(--color-secondary-main);
  }

  .section-header__inner--overlay .section-header__title-text-right {
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' fill='%23e5c31a'%3E%3Cpath d='M12 0h18v6h6v6h6v18h-6v6h-6v6H12v-6H6v-6H0V12h6V6h6V0zm12 6h-6v6h-6v6H6v6h6v6h6v6h6v-6h6v-6h6v-6h-6v-6h-6V6zm-6 12h6v6h-6v-6zm24 24h6v6h-6v-6z'%3E%3C/path%3E%3C/svg>");
    background-size: 4px;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }

  .section-header__subtitle {
    color: var(--color-black-alt-1);
  }

  .section-header__inner--overlay .section-header__subtitle {
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' fill='%23000000'%3E%3Cpath d='M12 0h18v6h6v6h6v18h-6v6h-6v6H12v-6H6v-6H0V12h6V6h6V0zm12 6h-6v6h-6v6H6v6h6v6h6v6h6v-6h6v-6h6v-6h-6v-6h-6V6zm-6 12h6v6h-6v-6zm24 24h6v6h-6v-6z'%3E%3C/path%3E%3C/svg>");
    background-size: 4px;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }
</style>

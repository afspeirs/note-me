<script lang="ts">
  import type { Icon as IconType } from 'lucide-svelte';
  import type { Snippet } from 'svelte';

  import { classNames } from '$lib/utils/classNames';

  const style = {
    base: 'peer/button rounded-lg select-none disabled:opacity-40 disabled:pointer-events-none focus-visible ring-inset',
    iconOnly: 'block p-3 sm:p-2',
    fullWidth: 'min-w-0 w-full',
    withText: 'flex items-center gap-3 p-3 sm:py-2',
  };

  const colours = {
    base: 'text-dark dark:text-light hover:bg-gray-300 dark:hover:bg-neutral-700',
    inverted: 'text-light dark:text-dark hover:bg-neutral-700 dark:hover:bg-gray-300',
    primary: 'text-light bg-primary hover:bg-primary/90',
  };

  const coloursActive = {
    ...colours,
    base: 'bg-gray-200 hover:bg-gray-300 dark:bg-neutral-700/60 dark:hover:bg-neutral-700',
  };

  interface BaseProps {
    active?: boolean,
    children: Snippet,
    class?: string,
    colour?: keyof typeof colours;
    colourActive?: keyof typeof coloursActive;
    fullWidth?: boolean,
    icon?: IconType;
    iconClass?: string,
    iconOnly?: boolean,
    secondaryAction?: Snippet,
  }

  interface ButtonOptions extends BaseProps {
    disabled?: boolean,
    href?: never,
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void
    target?: never,
  }

  interface LinkOptions extends BaseProps {
    disabled?: never,
    href: string,
    onClick?: never,
    target?: '_self' | '_blank',
  }

  type ButtonProps = ButtonOptions | LinkOptions;

  const {
    active,
    children,
    class: className = '',
    colour = 'base',
    colourActive = 'base',
    disabled,
    fullWidth = true,
    href,
    icon: Icon,
    iconClassName,
    iconOnly,
    onClick,
    secondaryAction,
    target = '_self',
    ...props
  }: ButtonProps = $props();
</script>

{#if href}
  <a
    class={classNames(
      iconOnly ? style.iconOnly : style.withText,
      !iconOnly && fullWidth ? style.fullWidth : '',
      active ? coloursActive[colourActive] : colours[colour],
      style.base,
      className,
    )}
    href={href}
    rel={target === '_blank' ? 'noreferrer' : undefined}
    target={target}
    onclick={onClick}
  >
    {#if Icon}
      <Icon class={classNames('size-6 flex-shrink-0', iconClassName)} aria-hidden="true" />
    {/if}

    <span class={classNames(iconOnly ? '' : 'truncate', iconOnly && Icon ? 'sr-only' : '')}>
      {@render children?.()}
    </span>

    {#if secondaryAction}
      <div class="ml-auto flex gap-2">
        {secondaryAction}
      </div>
    {/if}
  </a>
{:else}
  <button
    type="button"
    class={classNames(
      iconOnly ? style.iconOnly : style.withText,
      !iconOnly && fullWidth ? style.fullWidth : '',
      active ? coloursActive[colourActive] : colours[colour],
      style.base,
      className,
    )}
    disabled={disabled}
    onclick={onClick}
  >
    {#if Icon}
      <Icon class={classNames('size-6 flex-shrink-0', iconClassName)} aria-hidden="true" />
    {/if}

    <span class={classNames(iconOnly ? '' : 'truncate', iconOnly && Icon ? 'sr-only' : '')}>
      {@render children?.()}
    </span>

    {#if secondaryAction}
      <div class="ml-auto flex gap-2">
        {secondaryAction}
      </div>
    {/if}
  </button>
{/if}

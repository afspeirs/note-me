<script lang="ts" module>
  export const style = {
    base: 'peer/button cursor-pointer rounded-lg select-none disabled:opacity-40 disabled:pointer-events-none focus-visible ring-inset',
    iconOnly: 'block p-2',
    fullWidth: 'min-w-0 w-full',
    withText: 'flex items-center gap-3 p-3 py-2',
  };

  export const colours = {
    base: 'text-dark dark:text-light hover:bg-gray-300 dark:hover:bg-neutral-700',
    inverted: 'text-light dark:text-dark hover:bg-neutral-700 dark:hover:bg-gray-300',
    primary: 'text-light bg-primary hover:bg-primary/90',
  };

  export const coloursActive = {
    ...colours,
    base: 'bg-gray-200 hover:bg-gray-300 dark:bg-neutral-700/60 dark:hover:bg-neutral-700',
  };
</script>

<script lang="ts">
  import type { Icon as IconType } from 'lucide-svelte';
  import type { Snippet } from 'svelte';
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

  import { resolve } from '$app/paths';
  import type { Pathname } from '$app/types';
  import { classNames } from '$lib/utils/classNames';

  type BaseButtonProps = {
    active?: boolean,
    children: Snippet,
    class?: string,
    colour?: keyof typeof colours;
    colourActive?: keyof typeof coloursActive;
    fullWidth?: boolean,
    // TODO: fix this type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon?: IconType | any;
    iconClassName?: string,
    iconOnly?: boolean,
    secondaryAction?: Snippet,
  };

  type ButtonOptions = BaseButtonProps & HTMLButtonAttributes & {
    disabled?: boolean,
    href?: never,
    onclick?: (event: MouseEvent) => void
  };

  type LinkOptions = BaseButtonProps & HTMLAnchorAttributes & {
    disabled?: never,
    href: Pathname | `https://${string}`;
    onclick?: never,
  };

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
    iconClassName = '',
    iconOnly,
    onclick,
    secondaryAction,
    ...restProps
  }: ButtonProps = $props();
</script>

{#if href}
  {@const externalHref = href?.startsWith('https://')}
  <!-- eslint-disable svelte/no-navigation-without-resolve -- TODO: Remove the need for this to handle external urls -->
  <a
    class={classNames(
      iconOnly ? style.iconOnly : style.withText,
      !iconOnly && fullWidth ? style.fullWidth : '',
      active ? coloursActive[colourActive] : colours[colour],
      style.base,
      className,
    )}
    href={externalHref ? href : resolve(href as Pathname)}
    target={externalHref ? '_blank' : undefined}
    rel={externalHref ? 'external noopener noreferrer' : undefined}
    {onclick}
    {...restProps as HTMLAnchorAttributes}
  >
    {#if Icon}
      <Icon class="size-6 shrink-0 {iconClassName}" aria-hidden="true" />
    {/if}

    <span class={classNames(iconOnly ? '' : 'truncate', iconOnly && Icon ? 'sr-only' : '')}>
      {@render children?.()}
    </span>

    {#if secondaryAction}
      <div class="ml-auto flex gap-2">
        {@render secondaryAction?.()}
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
    {disabled}
    {onclick}
    {...restProps as HTMLButtonAttributes}
  >
    {#if Icon}
      <Icon class="size-6 shrink-0 {iconClassName}" aria-hidden="true" />
    {/if}

    <span class={classNames(iconOnly ? '' : 'truncate', iconOnly && Icon ? 'sr-only' : '')}>
      {@render children?.()}
    </span>

    {#if secondaryAction}
      <div class="ml-auto flex gap-2">
        {@render secondaryAction?.()}
      </div>
    {/if}
  </button>
{/if}

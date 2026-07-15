<script lang="ts">
  import type { Snippet } from 'svelte';
  import { classNames } from '$lib/utils/classNames';
  import type { HTMLAttributes } from 'svelte/elements';

  type CardProps = {
    as?: string, // TODO: fix this type
    children: Snippet,
    class?: string,
    fullscreen?: boolean,
    ref?: HTMLElement;
  } & HTMLAttributes<HTMLDivElement>;

  let {
    as = 'div',
    children,
    class: className = '',
    fullscreen,
    ref = $bindable(),
    ...rest
  }: CardProps = $props();
</script>

<svelte:element
  bind:this={ref}
  this={as}
  class={classNames(
    'bg-light dark:bg-dark dark:text-light shadow',
    fullscreen ? 'not-[@media_(display-mode:_browser)]:rounded-t-lg' : 'rounded-lg',
    className,
  )}
  {...rest}
>
  {@render children()}
</svelte:element>

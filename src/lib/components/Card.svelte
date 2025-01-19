<script lang="ts">
  import type { Snippet } from 'svelte';
  import { classNames } from '$lib/utils/classNames';

  type CardProps = {
    as?: string, // TODO: fix this type
    children: Snippet,
    class?: string,
    fullscreen?: boolean,
  };

  let {
    as = 'main',
    children,
    class: className = '',
    fullscreen,
    ...rest
  }: CardProps = $props();
</script>

<svelte:element
  this={as}
  class={classNames(
    'bg-light dark:bg-dark dark:text-light shadow',
    fullscreen ? '[@media_not_(display-mode:_browser)]:rounded-t-lg' : 'rounded-lg',
    className,
  )}
  {...rest}
>
  {@render children()}
</svelte:element>

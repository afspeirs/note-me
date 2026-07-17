<script lang="ts">
  import { Tooltip } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import { fly } from 'svelte/transition';

  type TooltipProps = {
    align?: 'start' | 'center' | 'end';
    alignOffset?: number;
    children: Snippet;
    content: string;
    side?: 'top' | 'right' | 'bottom' | 'left';
    sideOffset?: number;
  };

  let {
    align = 'center',
    children,
    content,
    side = 'bottom',
    sideOffset = 8,
  }: TooltipProps = $props();
</script>

<Tooltip.Root>
  <Tooltip.Trigger>
    {@render children()}
  </Tooltip.Trigger>
  <Tooltip.Content
    forceMount
    {align}
    {side}
    {sideOffset}
  >
    {#snippet child({ wrapperProps, props, open })}
      {#if open}
        <div {...wrapperProps}>
          <div
            class="pointer-events-none select-none z-10"
            transition:fly={{ y: 8, duration: 150 }}
            {...props}
          >
            <Tooltip.Arrow class="fill-dark dark:fill-light" />
            <div class="p-2 text-xs bg-dark text-light dark:text-dark dark:bg-light rounded-lg">
              {content}
            </div>
          </div>
        </div>
      {/if}
    {/snippet}
  </Tooltip.Content>
</Tooltip.Root>

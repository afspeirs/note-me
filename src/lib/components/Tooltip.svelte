<script lang="ts" module>
  export type TooltipProps = {
    align?: 'start' | 'center' | 'end';
    alignOffset?: number;
    content: string;
    side?: 'top' | 'right' | 'bottom' | 'left';
    sideOffset?: number;
    trigger: Snippet<[Record<string, unknown>]>,
  };
</script>

<script lang="ts">
  import { Tooltip } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import { fly } from 'svelte/transition';

  let {
    align = 'center',
    content,
    side = 'bottom',
    sideOffset = 8,
    trigger,
  }: TooltipProps = $props();
</script>

<Tooltip.Root>
  <Tooltip.Trigger>
    {#snippet child({ props })}
      {@render trigger(props)}
    {/snippet}
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

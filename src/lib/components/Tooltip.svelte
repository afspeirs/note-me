<script lang="ts">
  import { Tooltip } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import { fly } from 'svelte/transition';

  type TooltipProps = {
    content: string,
    children: Snippet,
  };

  let {
    content,
    children,
  }: TooltipProps = $props();
</script>

<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger>
      {@render children()}
    </Tooltip.Trigger>
    <Tooltip.Content
      forceMount
      sideOffset={8}
    >
      {#snippet child({ wrapperProps, props, open })}
        {#if open}
          <div {...wrapperProps}>
            <div
              class="pointer-events-none select-none z-10"
              transition:fly={{ y: 8, duration: 150 }}
              {...props}
            >
              <Tooltip.Arrow class="rounded-sm border-l-light border-t-light" />
              <div class="p-2 text-xs bg-dark text-light dark:text-dark dark:bg-light rounded-lg">
                {content}
              </div>
            </div>
          </div>
        {/if}
      {/snippet}
    </Tooltip.Content>
  </Tooltip.Root>
</Tooltip.Provider>

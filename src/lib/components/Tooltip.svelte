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

<Tooltip.Root>
  <Tooltip.Trigger>
    {@render children()}
  </Tooltip.Trigger>
  <Tooltip.Content
    transition={fly}
    transitionConfig={{ y: 8, duration: 150 }}
    sideOffset={8}
    class="p-2 text-xs bg-dark text-light dark:text-dark dark:bg-light rounded-lg pointer-events-none select-none z-10"
  >
    <Tooltip.Arrow class="rounded-[2px] border-l border-t border-dark-10" />
    <div class="">
      {content}
    </div>
  </Tooltip.Content>
</Tooltip.Root>

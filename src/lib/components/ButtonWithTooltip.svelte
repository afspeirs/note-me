<script lang="ts">
  import Tooltip, { type TooltipProps} from '$lib/components/Tooltip.svelte';
  import type { Snippet } from 'svelte';
  import Button, { type ButtonProps } from '$lib/components/Button.svelte';

  type ButtonWithTooltipProps = ButtonProps & {
    children: Snippet,
    tooltip: string;
    tooltipProps?: Omit<TooltipProps, 'trigger' | 'content'>;
  };

  let {
    children,
    tooltip,
    tooltipProps,
    ...buttonProps
  }: ButtonWithTooltipProps = $props();
</script>

<Tooltip content={tooltip} {...tooltipProps}>
  {#snippet trigger(triggerProps)}
    <Button {...buttonProps} {...triggerProps}>
      {@render children()}
    </Button>
  {/snippet}
</Tooltip>

<script lang="ts">
  import { XIcon } from '@lucide/svelte';
  import type { Snippet } from 'svelte';

  import ButtonWithTooltip from '$lib/components/ButtonWithTooltip.svelte';

  type CardHeaderProps = {
    children?: Snippet,
    onBack?: () => void,
    title?: string,
  };

  let {
    children,
    onBack,
    title,
  }: CardHeaderProps = $props();
</script>

<div class="relative flex gap-card-gap p-card-gap">
  <div class="ml-2 self-center font-bold text-xl truncate select-none">{title}</div>

  <div class="ml-auto"></div>

  {@render children?.()}

  {#if onBack}
    <ButtonWithTooltip
      icon={XIcon}
      iconOnly
      onclick={onBack}
      tooltip={`Close "${title}"`}
      tooltipProps={{
        align: 'end',
      }}
    >
      Close "{title}"
    </ButtonWithTooltip>
  {/if}
</div>

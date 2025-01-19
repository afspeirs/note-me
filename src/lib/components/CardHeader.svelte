<script lang="ts">
  import { XIcon } from 'lucide-svelte';
  import type { Snippet } from 'svelte';
  import Button from '$lib/components/Button.svelte';

  type CardHeaderProps = {
    children?: Snippet,
    onBack?: () => void,
    title: string,
  };

  let {
    children,
    onBack,
    title,
  }: CardHeaderProps = $props();
</script>

<div class="relative flex gap-card-gap p-card-gap min-h-12">
  <div class="ml-2 self-center font-bold text-xl truncate select-none">{title}</div>

  <div class="ml-auto"></div>

  {@render children?.()}

  {#if onBack}
    <Button
      Icon={XIcon}
      iconOnly
      onClick={onBack}
    >
      {`Close "${title}"`}
    </Button>
  {/if}
</div>

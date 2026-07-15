<script lang="ts">
  import { XIcon } from '@lucide/svelte';
  import { onMount, type Snippet } from 'svelte';

  import Button from '$lib/components/Button.svelte';
  import Card from '$lib/components/Card.svelte';
  import Tooltip from '$lib/components/Tooltip.svelte';

  type ModalProps = {
    children: Snippet;
    iconsLeft?: Snippet;
    iconsRight?: Snippet;
    onClose: () => void;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    title?: string | null;
    titleHide?: boolean | null;
  };

  let {
    children,
    iconsLeft,
    iconsRight,
    onClose,
    size = 'md',
    title,
    titleHide = false,
  }: ModalProps = $props();

  let dialogRef = $state<HTMLDialogElement>();

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
  };

  onMount(() => {
    if (dialogRef) dialogRef.showModal();
    return () => {
      if (dialogRef?.open) dialogRef.close();
    };
  });

  function handleClick(event: MouseEvent) {
    if (dialogRef && event.target === dialogRef) {
      onClose();
    }
  }
</script>

<Card
  bind:ref={dialogRef}
  as="dialog"
  onclick={handleClick}
  oncancel={(event) => {
    event.preventDefault();
    onClose();
  }}
  class="fixed inset-0 m-auto border-none p-0 w-full max-h-[90vh] overflow-auto pointer-events-auto {sizeClasses[size]} open:animate-modal-show backdrop:animate-backdrop-show backdrop:bg-primary/80 dark:backdrop:bg-black/80 backdrop:backdrop-blur-sm"
>
  <header class="relative flex gap-card-gap p-card-gap">
    {#if !titleHide}
      <div class="ml-2 self-center font-bold text-xl truncate select-none">{title}</div>
    {/if}

    {@render iconsLeft?.()}

    <div class="ml-auto"></div>

    {@render iconsRight?.()}

    <Tooltip content="Close">
      <Button
        icon={XIcon}
        iconOnly
        onclick={onClose}
      >
        Close
      </Button>
    </Tooltip>
  </header>

  {@render children()}
</Card>

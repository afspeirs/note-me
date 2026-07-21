<script lang="ts">
  import { MenuIcon } from '@lucide/svelte';
  import type { Snippet } from 'svelte';

  import ButtonWithTooltip from '$lib/components/ButtonWithTooltip.svelte';
  import { sidebarOpen } from '$lib/context/navigation.svelte';

  function toggleSidebarOpen() {
    sidebarOpen.toggle();
  }

  type PageProps = {
    children: Snippet,
    iconsLeft?: Snippet,
    iconsRight?: Snippet,
    title?: string | null,
    titleHide?: boolean | null,
  };

  let {
    children,
    iconsLeft,
    iconsRight,
    title,
    titleHide = false,
  }: PageProps = $props();
</script>

<svelte:head>
  <title>{title && title !== 'NoteMe' ? `${title} | ` : ''}NoteMe</title>
</svelte:head>

<header class="relative flex gap-card-gap p-card-gap">
  <ButtonWithTooltip
    icon={MenuIcon}
    iconOnly
    onclick={toggleSidebarOpen}
    tooltip="{sidebarOpen.value ? 'Close' : 'Open'} Sidebar"
    tooltipProps={{
      align: 'start',
    }}
  >
    {sidebarOpen.value ? 'Close' : 'Open'} Sidebar
  </ButtonWithTooltip>

  {#if !titleHide}
    <div class="ml-2 self-center font-bold text-xl truncate select-none">{title}</div>
  {/if}

  {@render iconsLeft?.()}

  <div class="ml-auto"></div>

  {@render iconsRight?.()}
</header>

<main class="flex-1 overflow-auto">
  {@render children()}
</main>

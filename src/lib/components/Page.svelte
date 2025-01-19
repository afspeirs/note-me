<script lang="ts">
  import { MenuIcon } from 'lucide-svelte';
  import type { Snippet } from 'svelte';

  import Button from '$lib/components/Button.svelte';
  import { drawerOpen } from '$lib/context/navigation.svelte';

  function toggleDrawerOpen() {
    drawerOpen.toggle();
  }

  type PageProps = {
    children: Snippet,
    iconsLeft?: Snippet | null,
    iconsRight?: Snippet | null,
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

<header class="relative flex gap-card-gap p-card-gap">
  <!-- <Tooltip content={`${open ? 'Close' : 'Open'} Sidebar`}>
  </Tooltip> -->
    <Button
      icon={MenuIcon}
      iconOnly
      text={`${open ? 'Close' : 'Open'} Sidebar`}
      onClick={toggleDrawerOpen}
    >
    </Button>


  {#if !titleHide}
    <div class="ml-2 self-center font-bold text-xl truncate select-none">{title}</div>
  {/if}

  {iconsLeft}

  <div class="ml-auto"></div>

  {iconsRight}
</header>

<main class="flex-1 overflow-auto">
  {@render children()}
</main>

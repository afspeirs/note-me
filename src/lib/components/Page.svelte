<script lang="ts">
  import { MenuIcon } from 'lucide-svelte';
  import type { Snippet } from 'svelte';

  import Button from '$lib/components/Button.svelte';
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

<header class="relative flex gap-card-gap p-card-gap">
  <!-- <Tooltip content={`${open ? 'Close' : 'Open'} Sidebar`}>
  </Tooltip> -->
    <Button
      icon={MenuIcon}
      iconOnly
      onclick={toggleSidebarOpen}
    >
      {`${sidebarOpen.value ? 'Close' : 'Open'} Sidebar`}
    </Button>


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

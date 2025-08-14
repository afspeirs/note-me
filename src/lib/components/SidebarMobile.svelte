<script lang="ts">
  import { Dialog } from 'bits-ui';
  import { fade, fly } from 'svelte/transition';

  import { currentFolderName, sidebarOpen } from '$lib/context/navigation.svelte';
  import SidebarPrimary from './SidebarPrimary.svelte';
  import SidebarSecondary from './SidebarSecondary.svelte';

  type SidebarMobileProps = {
    show: boolean;
  };

  let {
    show,
  }: SidebarMobileProps = $props();
  const duration = 400;
</script>

<Dialog.Root bind:open={show} onOpenChange={(value) => sidebarOpen.set(value)}>
  <Dialog.Portal>
    <Dialog.Overlay forceMount>
      {#snippet child({ props, open })}
        {#if open}
          <div
            class="fixed inset-0 bg-primary/70 dark:bg-black/70 backdrop-blur-sm"
            transition:fade={{ duration }}
            {...props}
          ></div>
        {/if}
      {/snippet}
    </Dialog.Overlay>
    <Dialog.Content forceMount>
      {#snippet child({ props, open })}
        {#if open}
          <div
            class="fixed top-0 left-0 bottom-0 flex flex-wrap [@media(display-mode:window-controls-overlay)]:mt-titlebar-area-height"
            transition:fly={{ duration, x: '-100%' }}
            {...props}
          >
            <div class="relative flex flex-col min-w-sidebar w-sidebar h-full px-sidebar-gap py-sidebar-gap pb-safe-offset-sidebar-gap gap-sidebar-gap">
              <SidebarPrimary />
            </div>

            {#if currentFolderName.value !== null}
              <button
                transition:fade={{ duration }}
                type="button"
                class="sm:hidden fixed inset-0 bg-primary/70 dark:bg-black/70 backdrop-blur-sm"
                onclick={() => currentFolderName.unset()}
              >
                <span class="sr-only">Close secondary sidebar</span>
              </button>
              <div
                transition:fly={{ duration, x: '-100%' }}
                class="relative max-sm:absolute max-sm:left-[calc(100vw-theme(spacing[sidebar]))] flex flex-col min-w-sidebar w-sidebar h-full pr-sidebar-gap py-sidebar-gap pb-safe-offset-sidebar-gap gap-sidebar-gap"
              >
                <SidebarSecondary />
              </div>
            {/if}
          </div>
        {/if}
      {/snippet}
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>

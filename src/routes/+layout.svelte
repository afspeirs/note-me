<script lang="ts">
  import Card from '$lib/components/Card.svelte';
  import SidebarPrimary from '$lib/components/SidebarPrimary.svelte';
  import SidebarSecondary from '$lib/components/SidebarSecondary.svelte';
  import Toaster from '$lib/components/Toaster.svelte';
  import TopBar from '$lib/components/TopBar.svelte';
  import { restoreFolder } from '$lib/context/file-system.svelte';
  import { currentFolderName, sidebarOpen, sidebarUseMobile } from '$lib/context/navigation.svelte';
  import { themeSystem } from '$lib/context/theme.svelte';
  import { classNames } from '$lib/utils/classNames';
  import '$lib/utils/registerServiceWorker';
  import '$lib/utils/webmanifest-apple';
  import '../app.css';

  themeSystem.subscribe((theme) => {
    if (theme === 'dark') {
      document.body.classList.add('dark', 'bg-black');
    } else {
      document.body.classList.remove('dark', 'bg-black');
    }
  });

  let clientWidth = $state<number | null>(null);
  let isMobile = $derived(clientWidth && clientWidth < 1024);

  // $effect(() => {
  //   if (isMobile || sidebarUseMobile.value) sidebarOpen.value = false;
  // });

  // $inspect({
  //   clientWidth,
  //   isMobile,
  //   sidebarUseMobile: sidebarUseMobile.value,
  //   sidebarOpen: sidebarOpen.value,
  // });

  restoreFolder();

  let { children } = $props();
</script>

<svelte:head>
  <title>NoteMe</title>
  <meta name="theme-color" content={$themeSystem === 'light' ? '#ee6e00' : '#000000'} />
</svelte:head>

<svelte:window
  on:keydown={(event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
      event.preventDefault();
      sidebarOpen.set(!sidebarOpen.value);
    }
  }}
/>

<div
  class="fixed inset-0 px-safe flex overflow-hidden pt-titlebar-area-height bg-primary dark:bg-black"
  bind:clientWidth={clientWidth}
>
  <TopBar />

  <!-- <Transition.Root show={(isMobile || sidebarUseMobile.value) && sidebarOpen.value} as={Fragment}>
    <Dialog class="relative" onClose={sidebarOpen.set(false)}>
      <Transition.Child
        as={Fragment}
        enter="transition-opacity ease-in-out duration-400"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-in-out duration-400"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div class="fixed inset-0 bg-primary/70 dark:bg-black/70 backdrop-blur-sm" />
      </Transition.Child>

      <div class="fixed inset-0 flex">
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-400 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-400 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <Dialog.Panel class="relative flex flex-wrap gap-sidebar-gap [@media(display-mode:window-controls-overlay)]:mt-titlebar-area-height">
            <div class="relative flex flex-col w-sidebar h-full py-sidebar-gap pb-safe-offset-sidebar-gap gap-sidebar-gap">
              <Sidebar />
            </div>

            <Transition.Root
              class="contents"
              show={(isMobile || sidebarUseMobile.value) && sidebarOpen.value && currentFolder !== null}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-in-out duration-400"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-in-out duration-400"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <button
                  type="button"
                  class="sm:hidden fixed inset-0 bg-primary/70 dark:bg-black/70 backdrop-blur-sm"
                  onclick={() => setCurrentFolder(null)}
                >
                  <span class="sr-only">Close Secondary Panel</span>
                </button>
              </Transition.Child>
              <Transition.Child
                unmount={false}
                enter="transition-[margin-left,opacity] ease-in-out duration-400"
                enterFrom="-ml-sidebar opacity-0"
                enterTo="ml-0 opacity-100"
                leave="transition-[margin-left,opacity] ease-in-out duration-400"
                leaveFrom="ml-0 opacity-100"
                leaveTo="-ml-sidebar opacity-0"
                class="relative max-sm:absolute max-sm:left-[calc(100vw-theme(spacing[sidebar]))] flex flex-col w-sidebar h-full py-sidebar-gap pb-safe-offset-sidebar-gap gap-sidebar-gap"
              >
                <SidebarNotes />
              </Transition.Child>
            </Transition.Root>
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition.Root>

  <Transition
    appear
    show={(!sidebarUseMobile.value && !isMobile) && sidebarOpen.value}
    as="aside"
    unmount={false}
    enter="transition-[margin-left,opacity] ease-in-out duration-400"
    enterFrom="-ml-sidebar opacity-0"
    enterTo="ml-0 opacity-100"
    leave="transition-[margin-left,opacity] ease-in-out duration-400"
    leaveFrom="ml-0 opacity-100"
    leaveTo="-ml-sidebar opacity-0"
    class="relative flex flex-col w-sidebar h-full py-sidebar-gap pb-safe-offset-sidebar-gap gap-sidebar-gap"
  >
    <Sidebar />
  </Transition>

  <Transition
    show={(!sidebarUseMobile.value && !isMobile) && sidebarOpen.value && currentFolder !== null}
    as="aside"
    unmount={false}
    enter="transition-[margin-left,opacity] ease-in-out duration-400"
    enterFrom="-ml-sidebar opacity-0"
    enterTo="ml-0 opacity-100"
    leave="transition-[margin-left,opacity] ease-in-out duration-400"
    leaveFrom="ml-0 opacity-100"
    leaveTo="-ml-sidebar opacity-0"
    class="relative flex flex-col w-sidebar h-full py-sidebar-gap pb-safe-offset-sidebar-gap gap-sidebar-gap"
  >
    <SidebarNotes />
  </Transition> -->

  <aside
    class={classNames(
      'relative flex flex-col min-w-sidebar w-sidebar h-full px-sidebar-gap py-sidebar-gap pb-safe-offset-sidebar-gap gap-sidebar-gap',
      'transition-[margin-left,opacity] ease-in-out duration-400',
      !sidebarUseMobile.value && !isMobile && sidebarOpen.value ? 'ml-0 opacity-100' : '-ml-sidebar opacity-0',
    )}
  >
    <SidebarPrimary />
  </aside>

  <aside
  class={classNames(
    'relative flex flex-col min-w-sidebar w-sidebar h-full pr-sidebar-gap py-sidebar-gap pb-safe-offset-sidebar-gap gap-sidebar-gap',
    'transition-[margin-left,opacity] ease-in-out duration-400 -z-10',
    !sidebarUseMobile.value && !isMobile && sidebarOpen.value && currentFolderName.value !== null ? 'ml-0 opacity-100' : '-ml-sidebar opacity-0',
  )}
>
  <SidebarSecondary />
</aside>

  <!-- {#if (isMobile || sidebarUseMobile.value) && sidebarOpen.value}
    <aside
      class="relative flex flex-wrap gap-sidebar-gap [@media(display-mode:window-controls-overlay)]:mt-titlebar-area-height"
    >
      <div class="relative flex flex-col min-w-sidebar w-sidebar h-full py-sidebar-gap pb-safe-offset-sidebar-gap gap-sidebar-gap">
        <Sidebar />
      </div>
    </aside>
  {/if} -->

  <div
    class={classNames(
      'relative flex-1 min-w-full sm:min-w-[initial] transition-[margin] duration-400',
      sidebarOpen.value && (!isMobile && !sidebarUseMobile.value) ? 'ml-0 m-sidebar-gap' : '',
    )}
  >
    <Card
      class="flex flex-col h-full overflow-hidden"
      fullscreen={!sidebarOpen.value || isMobile || sidebarUseMobile.value}
    >
      {@render children()}
    </Card>
  </div>
</div>

<Toaster />

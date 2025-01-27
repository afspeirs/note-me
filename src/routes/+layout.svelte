<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import Card from '$lib/components/Card.svelte';
  import SidebarMobile from '$lib/components/SidebarMobile.svelte';
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

  let { children } = $props();
  let innerWidth = $state<number | null>(null);
  let isMobile = $derived(innerWidth && innerWidth < 1024);

  themeSystem.subscribe((theme) => {
    if (theme === 'dark') {
      document.body.classList.add('dark', 'bg-black');
    } else {
      document.body.classList.remove('dark', 'bg-black');
    }
  });

  afterNavigate(() => {
    if (isMobile || sidebarUseMobile.value) sidebarOpen.set(false);
  });

  restoreFolder();
</script>

<svelte:head>
  <title>NoteMe</title>
  <meta name="theme-color" content={$themeSystem === 'light' ? '#ee6e00' : '#000000'} />
</svelte:head>

<svelte:window
  bind:innerWidth={innerWidth}
  on:keydown={(event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
      event.preventDefault();
      sidebarOpen.set(!sidebarOpen.value);
    }
  }}
/>

<div class="fixed inset-0 px-safe flex overflow-hidden pt-titlebar-area-height bg-primary dark:bg-black">
  <TopBar />

  <SidebarMobile show={(isMobile || sidebarUseMobile.value) && sidebarOpen.value} />

  <!-- TODO: Refactor to use transition: instead of adding classes -->
  <aside
    class={classNames(
      'relative flex flex-col min-w-sidebar w-sidebar h-full px-sidebar-gap py-sidebar-gap pb-safe-offset-sidebar-gap gap-sidebar-gap',
      'transition-[margin-left,opacity] duration-400',
      !sidebarUseMobile.value && !isMobile && sidebarOpen.value ? 'ml-0 opacity-100' : '-ml-sidebar opacity-0',
    )}
  >
    <SidebarPrimary />
  </aside>

  <!-- TODO: Refactor to use transition: instead of adding classes -->
  <aside
    class={classNames(
      'relative flex flex-col min-w-sidebar w-sidebar h-full pr-sidebar-gap py-sidebar-gap pb-safe-offset-sidebar-gap gap-sidebar-gap',
      'transition-[margin-left,opacity] duration-400 -z-10',
      !sidebarUseMobile.value && !isMobile && sidebarOpen.value && currentFolderName.value !== null ? 'ml-0 opacity-100' : '-ml-sidebar opacity-0',
    )}
  >
    <SidebarSecondary />
  </aside>

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

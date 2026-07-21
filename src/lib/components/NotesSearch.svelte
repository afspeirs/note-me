<script lang="ts">
  import { ArrowLeftIcon, XIcon } from '@lucide/svelte';
  import { SvelteURLSearchParams } from 'svelte/reactivity';

  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import Button from '$lib/components/Button.svelte';
  import ButtonWithTooltip from '$lib/components/ButtonWithTooltip.svelte';
  import { search } from '$lib/context/search.svelte';

  function hideSidebarSearch() {
    search.setSidebarOpen(false);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      hideSidebarSearch();
    }
  }

  // If the URL contains a search parameter, consume it into state and strip it from the URL
  $effect(() => {
    const searchParam = page.url.searchParams.get('search');

    if (searchParam !== null) {
      const decoded = decodeURIComponent(searchParam);

      // Consume the value into state and open sidebar
      if (search.value !== decoded) {
        search.value = decoded; // Direct assignment avoids loops
      }
      search.sidebarOpen = true;

      // Strip the ?search parameter from the browser address bar
      const newParams = new SvelteURLSearchParams(page.url.searchParams);
      newParams.delete('search');

      const newQuery = newParams.toString();
      const newUrl = newQuery ? `?${newQuery}` : window.location.pathname;

      // eslint-disable-next-line svelte/no-navigation-without-resolve
      goto(newUrl, {
        keepFocus: true,
        noScroll: true,
        replaceState: true,
      });
    }
  });
</script>

<svelte:window onkeydown={handleKeydown} />

<label
  for="notes-search"
  class="flex items-center gap-2 bg-light dark:bg-dark z-50"
>
  <span class="sr-only">Search Notes</span>
  <ButtonWithTooltip
    icon={ArrowLeftIcon}
    iconOnly
    onclick={hideSidebarSearch}
    tooltip="Hide Search"
    tooltipProps={{
      align: 'start',
    }}
  >
    Hide Search
  </ButtonWithTooltip>
  <input
    autocomplete="off"
    name="notes-search"
    id="notes-search"
    bind:value={search.value}
    class="block w-full h-full p-0 py-1.5 border-0 border-b-2 border-b-text-gray-400 focus:border-b-white bg-inherit placeholder:text-gray-400 placeholder:select-none focus:ring-0"
    placeholder="Search Notes"
  />
  {#if search.value.length > 0}
    <Button
      icon={XIcon}
      iconOnly
      disabled={!search.value.length}
      onclick={() => search.set('')}
    >
      Clear
    </Button>
  {/if}
</label>

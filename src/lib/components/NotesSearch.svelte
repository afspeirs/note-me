<script lang="ts">
  import { ArrowLeftIcon, XIcon } from '@lucide/svelte';

  import Button from '$lib/components/Button.svelte';
  import Tooltip from '$lib/components/Tooltip.svelte';
  import { search } from '$lib/context/search.svelte';

  function hideSidebarSearch() {
    search.setSidebarOpen(false);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      hideSidebarSearch();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<label
  for="notes-search"
  class="flex items-center gap-2 bg-light dark:bg-dark z-50"
>
  <span class="sr-only">Search Notes</span>
  <Tooltip align="start" content="Hide Search">
    <Button
      icon={ArrowLeftIcon}
      iconOnly
      onclick={hideSidebarSearch}
    >
      Hide Search
    </Button>
  </Tooltip>
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

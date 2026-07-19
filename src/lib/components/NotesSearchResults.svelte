<script lang="ts">
  import { FileIcon } from '@lucide/svelte';

  import { page } from '$app/state';
  import Button from '$lib/components/Button.svelte';
  import { style } from '$lib/components/Button.svelte';
  import { fileSystem } from '$lib/context/file-system.svelte';
  import { search } from '$lib/context/search.svelte';

  const items = $derived.by(() => {
    if (!fileSystem.cache) return [];

    const query = search.value.trim();
    if (!query) return [];

    return [...fileSystem.cache.values()]
      .filter((item) => item.kind === 'file' && item.name.toLowerCase().includes(query))
      .sort((a, b) => a.name.localeCompare(b.name));
  });
</script>

{#if items.length > 0}
  <ul class="flex flex-col gap-1" aria-label="Search results">
    {#each items as item (item.id)}
      {@const isFileOpen = item.id === page.params.path}
      <li>
        <Button
          icon={FileIcon}
          href="/note/{item.id}"
          active={isFileOpen}
        >
          {item.name}
        </Button>
      </li>
    {/each}
  </ul>
{:else}
  <div class="{style.withText} relative text-dark dark:text-light select-none">
    No results found {search.value.trim() ? `for "${search.value.trim()}"` : ''}
  </div>
{/if}

<script lang="ts">
  import { FolderSearch } from '@lucide/svelte';

  import Button from '$lib/components/Button.svelte';
  import Page from '$lib/components/Page.svelte';
  import RecentlyModifiedFiles from '$lib/components/RecentlyModifiedFiles.svelte';
  import { fileSystem, selectFolder } from '$lib/context/file-system.svelte';
</script>

<Page title="NoteMe">
  <div class="flex flex-col gap-3 p-3 h-full">
    <p class="text-3xl mb-2">Hello and welcome to NoteMe.</p>

    {#if fileSystem.loading}
      <!-- TODO: Add loading spinner -->
      <div class="fixed inset-0 grid place-items-center">Loading</div>
    {:else}
      {#if fileSystem.folder}
        <p class="text-gray-700 dark:text-gray-300">
          You are currently viewing the <strong class="font-semibold">{fileSystem.folder.name}</strong> folder.
        </p>
        <p>
          Select a note from the sidebar to get started, or select a recently edited note below:
        </p>
      {:else}
        <p class="text-gray-700 dark:text-gray-300 mb-4">
          You are not currently viewing any folder.
        </p>
        <Button
          active
          icon={FolderSearch}
          onclick={selectFolder}
        >
          Select Folder
        </Button>
      {/if}
    {/if}

    <RecentlyModifiedFiles />
  </div>
</Page>

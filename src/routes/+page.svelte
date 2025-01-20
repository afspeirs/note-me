<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Page from '$lib/components/Page.svelte';
  import { fileSystem, selectFolder } from '$lib/context/file-system.svelte';
</script>

<Page title="NoteMe">
  <div class="flex flex-col gap-3 p-3">
    <p class="text-3xl">Hello and welcome to NoteMe.</p>

    {#if fileSystem.folder}
      <p>
        You are currently viewing the <strong>{fileSystem.folder.name}</strong> folder.
      </p>
      <p>
        Select a note from the sidebar to get started,
        or select a recently edited note below:
      </p>
    {:else}
      <p>
        You are not currently viewing any folder.
      </p>
      <Button onclick={selectFolder}>Select Folder</Button>
    {/if}

  </div>
</Page>

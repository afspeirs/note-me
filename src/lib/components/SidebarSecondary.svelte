<script lang="ts">
  import { FileIcon } from 'lucide-svelte';

  import { page } from '$app/state';
  import Button from '$lib/components/Button.svelte';
  import Card from '$lib/components/Card.svelte';
  import CardHeader from '$lib/components/CardHeader.svelte';
  import { fileSystem, selectFolder } from '$lib/context/file-system.svelte';
  import { currentFolderName } from '$lib/context/navigation.svelte';

  const currentFolder = $derived(fileSystem.folder?.children.find((child) => child.name === currentFolderName.value) || null);
</script>

<Card
  as="nav"
  class="flex flex-col flex-1 h-1/2"
  aria-label="sidebar notes"
>
  <CardHeader
    onBack={() => currentFolderName.unset()}
    title={currentFolderName.value || undefined}
  >
    <!-- <NotesSort />
    <NotesSearch /> -->
  </CardHeader>

  <div class="overflow-auto px-card-gap">
    {#if currentFolder?.kind === 'directory' && currentFolder?.children}
      <ul>
        {#each currentFolder.children as child}
          {#if child.kind === 'file'}
            <li>
              <Button
                icon={FileIcon}
                href="/note/{child.id}"
                active={child.id === page.params.id}
              >
                {child.name}
              </Button>
            </li>
          <!-- {:else if child.kind === 'directory'}
            <li>
              <Button
                icon={currentFolderName.value === child.name ? FolderOpenIcon : FolderIcon}
                onclick={() => currentFolderName.set(child.name)}
              >
                {child.name}
              </Button>
            </li> -->
          {/if}
        {/each}
      </ul>
    {:else}
      <Button onclick={selectFolder}>Select Folder</Button>
    {/if}
  </div>
</Card>

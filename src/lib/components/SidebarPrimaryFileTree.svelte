<script lang="ts">
  import { ChevronRightIcon, FileIcon, FilePlusIcon, FolderIcon, FolderOpenIcon, Trash2Icon } from '@lucide/svelte';
  import { Accordion, ContextMenu } from 'bits-ui';

  import { page } from '$app/state';
  import Button, { colours, style } from '$lib/components/Button.svelte';
  import SidebarPrimaryFileTree from '$lib/components/SidebarPrimaryFileTree.svelte';
  import { createFile, deleteFile, type FileSystemEntry } from '$lib/context/file-system.svelte';

  type SidebarPrimaryFileTreeProps = {
    items: FileSystemEntry[];
  };

  let {
    items,
  }: SidebarPrimaryFileTreeProps = $props();
  let openFolders = $state<string[]>([]);
  let activeMenuId = $state<string | null>(null);

  async function handleNewFile(directoryItem: FileSystemEntry) {
    if (directoryItem.kind !== 'directory') return;

    // eslint-disable-next-line no-alert -- TODO: Replace with a dialog
    const fileName = window.prompt('New file name?', 'Untitled')?.trim();
    if (!fileName) return;

    await createFile(directoryItem.handle, fileName);
  }

  async function handleDelete(item: FileSystemEntry) {
    if (item.kind !== 'file') return;

    // eslint-disable-next-line no-alert -- TODO: Replace with a dialog
    const confirmed = window.confirm(`Are you sure you want to delete "${item.name}"?`);
    if (!confirmed) return;

    await deleteFile(item.handle);
  }
</script>

<Accordion.Root type="multiple" bind:value={openFolders}>
  {#each items as item (item.id)}
    <ContextMenu.Root
      open={activeMenuId === item.id}
      onOpenChange={(open) => activeMenuId = open ? item.id : null}
    >
      <ContextMenu.Trigger>
        {#snippet child({ props: menuProps })}
          {#if item.kind === 'file'}
            <li {...menuProps}>
              <Button
                icon={FileIcon}
                href="/note/{item.id}"
                active={item.id === page.params.path}
              >
                {item.name}
              </Button>
            </li>
          {:else if item.kind === 'directory'}
            {@const isFolderOpen = openFolders.includes(item.id)}
            <li {...menuProps}>
              <Accordion.Item value={item.id}>
                <Accordion.Header>
                  <Accordion.Trigger>
                    {#snippet child({ props: triggerProps })}
                      <Button
                        icon={isFolderOpen ? FolderOpenIcon : FolderIcon}
                        active={isFolderOpen || page?.params?.path?.startsWith(item.id)}
                        {...triggerProps}
                      >
                        {item.name}
                        {#snippet secondaryAction()}
                          <ChevronRightIcon
                            class="size-6 shrink-0 -mr-1 transition-transform {isFolderOpen && 'rotate-90'}"
                            aria-hidden="true"
                          />
                        {/snippet}
                      </Button>
                    {/snippet}
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content class="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm tracking-[-0.01em]">
                  {#if isFolderOpen}
                    <ul class="ml-4">
                      <SidebarPrimaryFileTree items={item.children} />
                    </ul>
                  {/if}
                </Accordion.Content>
              </Accordion.Item>
            </li>
          {/if}
        {/snippet}
      </ContextMenu.Trigger>

      {#if activeMenuId === item.id}
        <ContextMenu.Portal>
          <ContextMenu.Content class="z-50 min-w-40 select-none bg-light dark:bg-dark dark:text-light shadow rounded-lg outline-hidden font-sans text-sm p-card-gap">
            {#if item.kind === 'directory'}
              <ContextMenu.Item
                onSelect={() => handleNewFile(item)}
                class="{style.base} {style.withText} {colours.base}"
              >
                <FilePlusIcon class="size-4" />
                <span>New File</span>
              </ContextMenu.Item>
            {/if}
            {#if item.kind === 'file'}
              <ContextMenu.Item
                onSelect={() => handleDelete(item)}
                class="{style.base} {style.withText} {colours.base}"
              >
                <Trash2Icon class="size-4 text-red-500" />
                <span class="text-red-500">Delete</span>
              </ContextMenu.Item>
            {/if}
          </ContextMenu.Content>
        </ContextMenu.Portal>
      {/if}
    </ContextMenu.Root>
  {/each}
</Accordion.Root>

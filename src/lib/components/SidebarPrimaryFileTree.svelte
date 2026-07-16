<script lang="ts">
  import { Accordion } from 'bits-ui';
  import { ChevronRightIcon, FileIcon, FolderIcon, FolderOpenIcon } from '@lucide/svelte';

  import { page } from '$app/state';
  import Button from '$lib/components/Button.svelte';
  import SidebarPrimaryFileTree from '$lib/components/SidebarPrimaryFileTree.svelte';
  import type { FileSystemEntry } from '$lib/context/file-system.svelte';

  type SidebarPrimaryFileTreeProps = {
    items: FileSystemEntry[];
  };

  let {
    items,
  }: SidebarPrimaryFileTreeProps = $props();
  let openFolders = $state<string[]>([]);
</script>

<Accordion.Root type="multiple" bind:value={openFolders}>
  {#each items as item (item.id)}
    {@const isFileOpen = item.id === page.params.path}
    {#if item.kind === 'file'}
      <li>
        <Button
          icon={FileIcon}
          href="/note/{item.id}"
          active={isFileOpen}
        >
          {item.name}
        </Button>
      </li>
    {:else if item.kind === 'directory'}
      {@const isFolderOpen = openFolders.includes(item.id)}
      {@const containsOpenFile = page?.params?.path?.startsWith(item.id)}
      <li>
        <Accordion.Item value={item.id}>
          <Accordion.Header>
            <Accordion.Trigger>
              {#snippet child({ props })}
                <Button
                  icon={isFolderOpen ? FolderOpenIcon : FolderIcon}
                  active={isFolderOpen || containsOpenFile}
                  {...props}
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
            <ul class="ml-4">
              <SidebarPrimaryFileTree items={item.children} />
            </ul>
          </Accordion.Content>
        </Accordion.Item>
      </li>
    {/if}
  {/each}
</Accordion.Root>

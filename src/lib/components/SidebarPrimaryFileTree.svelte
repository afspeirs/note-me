<script lang="ts">
  import { Accordion } from 'bits-ui';
  import { ChevronRightIcon, FileIcon, FolderIcon, FolderOpenIcon } from 'lucide-svelte';

  import { page } from '$app/state';
  import Button from '$lib/components/Button.svelte';
  import SidebarPrimaryFileTree from '$lib/components/SidebarPrimaryFileTree.svelte';
  import type { FileSystemEntry } from '$lib/context/file-system.svelte';
  import { currentFolderName } from '$lib/context/navigation.svelte';

  type SidebarPrimaryFileTreeProps = {
    items: FileSystemEntry[]
  };

  let openFolders = $state<string[]>([]);

  let {
    items,
  }: SidebarPrimaryFileTreeProps = $props();
</script>

<Accordion.Root type="multiple" bind:value={openFolders}>
  {#each items as item (item.id)}
    {@const active = openFolders.includes(item.id)}
    {#if item.kind === 'file'}
      <li>
        <Button
          icon={FileIcon}
          href="/note/{item.id}"
          active={item.id === page.params.id}
        >
          {item.name}
        </Button>
      </li>
    {:else if item.kind === 'directory'}
      <li>
        <Accordion.Item value={item.id}>
          <Accordion.Header>
            <Accordion.Trigger>
              {#snippet child({ props })}
                <Button
                  icon={active ? FolderOpenIcon : FolderIcon}
                  onclick={() => currentFolderName.set(item.name)}
                  {active}
                  {...props}
                >
                  {item.name}
                  {#snippet secondaryAction()}
                    <ChevronRightIcon
                      class="size-6 shrink-0 -mr-1 transition-transform {active && 'rotate-90'}"
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

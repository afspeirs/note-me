<script lang="ts">
  import { Accordion } from 'bits-ui';
  import { ChevronRightIcon, FileIcon, FolderIcon, FolderOpenIcon, FolderSearch, PinIcon, PinOffIcon, RefreshCwIcon } from 'lucide-svelte';

  import { page } from '$app/state';
  import Button from '$lib/components/Button.svelte';
  import Card from '$lib/components/Card.svelte';
  import CardHeader from '$lib/components/CardHeader.svelte';
  import Tooltip from '$lib/components/Tooltip.svelte';
  import { fileSystem, refreshFolder, selectFolder } from '$lib/context/file-system.svelte';
  import { currentFolderName, sidebarUseMobile } from '$lib/context/navigation.svelte';

  let isFileSystemRefreshing = $state(false);
  let openFolders = $state<string[]>([]);
</script>

<Card
  as="nav"
  class="relative flex flex-col flex-1 overflow-hidden"
  aria-label="sidebar folders"
>
  <CardHeader title={fileSystem.folder?.name || 'No folder selected'}>
    <div class="hidden lg:contents">
      <Tooltip content={`${sidebarUseMobile.value ? 'Pin' : 'Un-pin'} sidebar`}>
        <Button
          icon={sidebarUseMobile.value ? PinIcon : PinOffIcon}
          iconOnly
          onclick={() => sidebarUseMobile.toggle()}
        >
          {`${sidebarUseMobile.value ? 'Pin' : 'Un-pin'} sidebar`}
        </Button>
      </Tooltip>
    </div>
    {#if fileSystem.folderHandle}
      <Tooltip content="Refresh Folder">
        <Button
          class={isFileSystemRefreshing ? 'animate-spin' : ''}
          disabled={isFileSystemRefreshing}
          icon={RefreshCwIcon}
          iconOnly
          onclick={() => {
            refreshFolder();

            isFileSystemRefreshing = true;
            setTimeout(() => {
              isFileSystemRefreshing = false;
            }, 1000);
          }}
        >
          Refresh Folder
        </Button>
      </Tooltip>
    {/if}
  </CardHeader>

  <div class="overflow-auto px-card-gap">
    {#if fileSystem.folder}
      <ul>
        <Accordion.Root type="multiple" bind:value={openFolders}>
          {#each fileSystem.folder.children as item (item.id)}
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
                      {#each item.children as subItem (subItem.id)}
                        {#if subItem.kind === 'file'}
                          <li>
                            <Button
                              icon={FileIcon}
                              href="/note/{subItem.id}"
                              active={subItem.id === page.params.id}
                            >
                              {subItem.name}
                            </Button>
                          </li>
                        {:else if subItem.kind === 'directory'}
                          <li>
                            <!-- TODO: Add recursion for the component here to display nested folders -->
                            <Button
                              disabled
                              icon={FolderIcon}
                              onclick={() => currentFolderName.set(subItem.name)}
                            >
                              {subItem.name}
                              {#snippet secondaryAction()}
                                <ChevronRightIcon class="size-6 shrink-0 -mr-1" aria-hidden="true" />
                              {/snippet}
                            </Button>
                          </li>
                        {/if}
                      {/each}
                    </ul>
                  </Accordion.Content>
                </Accordion.Item>
              </li>
            {/if}
          {/each}
        </Accordion.Root>
      </ul>
    {:else}
      <Button
        icon={FolderSearch}
        onclick={selectFolder}
      >
        Select Folder
      </Button>
    {/if}
  </div>
</Card>

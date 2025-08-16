<script lang="ts">
  import { ChevronRightIcon, FileIcon, FolderIcon, FolderOpenIcon, FolderSearch, PinIcon, PinOffIcon, RefreshCwIcon } from 'lucide-svelte';

  import { page } from '$app/state';
  import Button from '$lib/components/Button.svelte';
  import Card from '$lib/components/Card.svelte';
  import CardHeader from '$lib/components/CardHeader.svelte';
  import Tooltip from '$lib/components/Tooltip.svelte';
  import { fileSystem, refreshFolder, selectFolder } from '$lib/context/file-system.svelte';
  import { currentFolderName, sidebarUseMobile } from '$lib/context/navigation.svelte';

  let isFileSystemRefreshing = $state(false);
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
        {#each fileSystem.folder.children as child (child.id)}
          {@const active = currentFolderName.value === child.name}
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
          {:else if child.kind === 'directory'}
            <li>
              <Button
                icon={currentFolderName.value === child.name ? FolderOpenIcon : FolderIcon}
                onclick={() => currentFolderName.set(child.name)}
                {active}
              >
                {child.name}
                {#snippet secondaryAction()}
                  <ChevronRightIcon class="size-6 shrink-0 -mr-1" aria-hidden="true" />
                {/snippet}
              </Button>
              <!-- <ul>
                {#each child.children as subChild (subChild.id)}
                  {#if subChild.kind === 'file'}
                    <li>
                      {subChild.name}
                    </li>
                  {:else if subChild.kind === 'directory'}
                    <li>
                      <div>
                        <strong>{subChild.name}</strong>
                        {#if subChild.children.length > 0}
                          <ul>
                            {#each subChild.children as subSubChild (subSubChild.id)}
                              <li>
                                {#if subSubChild.kind === 'file'}
                                  {subSubChild.name}
                                {:else}
                                  <strong>{subSubChild.name}</strong>
                                {/if}
                              </li>
                            {/each}
                          </ul>
                        {/if}
                      </div>
                    </li>
                  {/if}
                {/each}
              </ul> -->
            </li>
          {/if}
        {/each}
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

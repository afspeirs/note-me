<script lang="ts">
  import { FileIcon, FolderIcon, FolderOpenIcon, RefreshCwIcon } from 'lucide-svelte';

  import Button from '$lib/components/Button.svelte';
  import Card from '$lib/components/Card.svelte';
  import CardHeader from '$lib/components/CardHeader.svelte';
  import { fileSystem, refreshFolder, selectFolder } from '$lib/context/file-system.svelte';
  import { currentFolder } from '$lib/context/navigation.svelte';

  let isFileSystemRefreshing = $state(false);
</script>

<Card
  as="nav"
  class="relative flex flex-col flex-1 overflow-hidden"
  aria-label="sidebar folders"
>
  <CardHeader title={fileSystem.folder?.name || 'No folder selected'}>
    <!-- {#if !isMobile}
      <Button
        class="hidden sm:block"
        icon={sidebarUseMobile ? PinIcon : PinOffIcon}
        iconOnly
        onclick={() => sidebarUseMobile.toggle()}
      >
        {`${sidebarUseMobile ? 'pin' : 'un-pin'} sidebar`}
      </Button>
    {/if} -->
    {#if fileSystem.folderHandle}
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
    {/if}
  </CardHeader>

  <div class="overflow-auto px-card-gap">
    {#if fileSystem.folder}
      <ul>
        {#each fileSystem.folder.children as child}
          {#if child.kind === 'file'}
            <li>
              <Button
                icon={FileIcon}
                onclick={() => console.log(child.name)}
              >
                {child.name}
              </Button>
            </li>
          {:else if child.kind === 'directory'}
            <li>
              <Button
                icon={currentFolder.value === child.name ? FolderOpenIcon : FolderIcon}
                onclick={() => currentFolder.set(child.name)}
              >
                {child.name}
              </Button>
              <!-- <ul>
                {#each child.children as subChild}
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
                            {#each subChild.children as subSubChild}
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
      <Button onclick={selectFolder}>Select Folder</Button>
    {/if}
  </div>
</Card>

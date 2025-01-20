<script lang="ts">
  import Card from '$lib/components/Card.svelte';
  import CardHeader from '$lib/components/CardHeader.svelte';
  import { fileSystem, refreshFolder, selectFolder } from '$lib/context/file-system.svelte';
  import Button from '$lib/components/Button.svelte';
  import { RefreshCwIcon } from 'lucide-svelte';

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
        className="hidden sm:block"
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

  <div class="overflow-auto px-2">
    {#if fileSystem.folder}
      <ul>
        {#each fileSystem.folder.children as child}
          {#if child.kind === 'file'}
            <li>
              <button>
                {child.name}
              </button>
            </li>
          {:else if child.kind === 'directory'}
            <li>
              <div>
                <strong>{child.name}</strong>
                <ul>
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
                </ul>
              </div>
            </li>
          {/if}
        {/each}
      </ul>
    {:else}
      <Button onclick={selectFolder}>Select Folder</Button>
    {/if}
  </div>
</Card>

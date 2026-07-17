<script lang="ts">
  import { FolderSearch, PinIcon, PinOffIcon, RefreshCwIcon } from '@lucide/svelte';

  import Button from '$lib/components/Button.svelte';
  import Card from '$lib/components/Card.svelte';
  import CardHeader from '$lib/components/CardHeader.svelte';
  import SidebarPrimaryFileTree from '$lib/components/SidebarPrimaryFileTree.svelte';
  import Tooltip from '$lib/components/Tooltip.svelte';
  import { fileSystem, refreshFolder, selectFolder } from '$lib/context/file-system.svelte';
  import { sidebarUseMobile } from '$lib/context/navigation.svelte';

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
      <Tooltip align="end" content="Refresh Folder">
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
    {#if fileSystem.folder?.children}
      <ul>
        <SidebarPrimaryFileTree items={fileSystem.folder.children} />
      </ul>
    {:else}
      <Button
        active
        icon={FolderSearch}
        onclick={selectFolder}
      >
        Select Folder
      </Button>
    {/if}
  </div>
</Card>

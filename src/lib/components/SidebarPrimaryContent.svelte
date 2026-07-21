<script lang="ts">
  import { FolderSearch, PinIcon, PinOffIcon, RefreshCwIcon, SearchIcon, SearchXIcon } from '@lucide/svelte';

  import Button from '$lib/components/Button.svelte';
  import ButtonWithTooltip from '$lib/components/ButtonWithTooltip.svelte';
  import Card from '$lib/components/Card.svelte';
  import CardHeader from '$lib/components/CardHeader.svelte';
  import SidebarPrimaryFileTree from '$lib/components/SidebarPrimaryFileTree.svelte';
  import { fileSystem, refreshFolder, selectFolder } from '$lib/context/file-system.svelte';
  import { sidebarUseMobile } from '$lib/context/navigation.svelte';
  import { search } from '$lib/context/search.svelte';

  let isFileSystemRefreshing = $state(false);
</script>

<Card
  as="nav"
  class="relative flex flex-col flex-1 overflow-hidden"
  aria-label="sidebar folders"
>
  <CardHeader title={fileSystem.folder?.name || 'No folder selected'}>
    {#if fileSystem.folderHandle}
      <ButtonWithTooltip
        icon={search.sidebarOpen ? SearchXIcon : SearchIcon}
        iconOnly
        onclick={() => search.toggleSidebar()}
        tooltip="Show Search"
      >
        Show Search
      </ButtonWithTooltip>
      <ButtonWithTooltip
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
        tooltip="Refresh Folder"
        tooltipProps={{
          align: 'end',
        }}
      >
        Refresh Folder
      </ButtonWithTooltip>
    {/if}
    <div class="hidden lg:contents">
      <ButtonWithTooltip
        icon={sidebarUseMobile.value ? PinIcon : PinOffIcon}
        iconOnly
        onclick={() => sidebarUseMobile.toggle()}
        tooltip="{sidebarUseMobile.value ? 'Pin' : 'Un-pin'} sidebar"
        tooltipProps={{
          align: 'end',
        }}
      >
        {sidebarUseMobile.value ? 'Pin' : 'Un-pin'} sidebar
      </ButtonWithTooltip>
    </div>
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

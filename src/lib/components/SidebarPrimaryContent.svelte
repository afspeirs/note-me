<script lang="ts">
  import Card from '$lib/components/Card.svelte';
  import CardHeader from '$lib/components/CardHeader.svelte';
</script>

<Card
  as="nav"
  className="relative flex flex-col flex-1 overflow-hidden"
  aria-label="sidebar folders"
>
  <CardHeader title="Folders">
    <!-- {#if !isMobile}
      <Button
        className="hidden sm:block"
        Icon={useMobileDrawer ? PinIcon : PinOffIcon}
        iconOnly
        onClick={() => setUseMobileDrawer((prevState) => !prevState)}
      >
        {`${useMobileDrawer ? 'pin' : 'un-pin'} sidebar`}
      </Button>
    {/if} -->
  </CardHeader>

  <!-- <FolderList
    folders={folders}
    fullHeight
    isFetching={isFetching}
  /> -->
</Card>

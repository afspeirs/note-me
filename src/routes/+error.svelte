<script lang="ts">
  import { HouseIcon } from '@lucide/svelte';

  import { page } from '$app/state';
  import Button from '$lib/components/Button.svelte';
  import Card from '$lib/components/Card.svelte';
  import CardHeader from '$lib/components/CardHeader.svelte';
  import TopBar from '$lib/components/TopBar.svelte';
</script>

<div class="fixed inset-0 px-safe flex overflow-hidden pt-titlebar-area-height bg-primary dark:bg-black">
  <TopBar />

  <Card class="flex flex-col h-full w-full m-card-gap">
    <CardHeader title="Error" />

    <div class="flex flex-col flex-1 p-3">
      <h1>{page.status} {page?.error?.message}</h1>

      <Button
        colour="primary"
        href="/"
        icon={HouseIcon}
        class="mt-auto"
      >
        Return to Home
      </Button>
    </div>
  </Card>
</div>

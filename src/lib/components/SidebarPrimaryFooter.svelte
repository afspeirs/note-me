<script lang="ts">
  import { HouseIcon, SettingsIcon } from '@lucide/svelte';

  import { page } from '$app/state';
  import Button from '$lib/components/Button.svelte';
  import Card from '$lib/components/Card.svelte';
  import { modal } from '$lib/context/modal.svelte';

  const path = $derived(page.url.pathname);
</script>

<Card
  as="nav"
  aria-label="sidebar footer"
>
  <ul role="list" class="flex flex-col p-card-gap">
    <li>
      <Button
        href="/"
        icon={HouseIcon}
        active={path === '/'}
        aria-current={path === '/' ? 'page' : undefined}
      >
        Home
      </Button>
    </li>
    <li>
      <Button
        onclick={() => modal.open('settings')}
        icon={SettingsIcon}
        active={modal.current.type === 'settings'}
      >
        Settings
      </Button>
    </li>
  </ul>
</Card>

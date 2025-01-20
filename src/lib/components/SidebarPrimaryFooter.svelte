<script lang="ts">
  import { HomeIcon, SettingsIcon } from 'lucide-svelte';

  import { page } from '$app/state';
  import Button from '$lib/components/Button.svelte';
  import Card from '$lib/components/Card.svelte';

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
        icon={HomeIcon}
        active={path === '/'}
        aria-current={path === '/' ? 'page' : undefined}
      >
        Home
      </Button>
    </li>
    <li>
      <Button
        href="/settings/"
        icon={SettingsIcon}
        active={path === '/settings'}
        aria-current={path === '/settings' ? 'page' : undefined}
      >
        Settings
      </Button>
    </li>
  </ul>
</Card>

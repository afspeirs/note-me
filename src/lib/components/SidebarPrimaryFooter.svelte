<script lang="ts">
  import { HomeIcon, SettingsIcon } from 'lucide-svelte';

  import Button from '$lib/components/Button.svelte';
  import Card from '$lib/components/Card.svelte';
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
      >
        Home
      </Button>
    </li>
    <li>
      <Button
        href="/settings/"
        icon={SettingsIcon}
      >
        Settings
      </Button>
    </li>
  </ul>
</Card>

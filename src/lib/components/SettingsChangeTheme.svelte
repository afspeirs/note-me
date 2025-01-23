<script lang="ts">
  import { MoonIcon, SunIcon } from 'lucide-svelte';

  import Button from '$lib/components/Button.svelte';
  import { themeSystem, themeUser, themeUserOptions } from '$lib/context/theme.svelte';

  function handleUpdateTheme() {
    themeUser.set($themeSystem === 'dark' ? 'light' : 'dark');
  }
</script>

{#snippet secondaryAction()}
  {themeUserOptions[$themeSystem]}
{/snippet}

<div class="m-card-gap">
  <Button
    icon={$themeSystem === 'dark' ? MoonIcon : SunIcon}
    onclick={handleUpdateTheme}
    {secondaryAction}
  >
    Theme
  </Button>
</div>

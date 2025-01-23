<script lang="ts">
  import { GithubIcon } from 'lucide-svelte';

  // import AIcon from '$lib/components/AIcon.svelte';
  import Button from '$lib/components/Button.svelte';
  import Page from '$lib/components/Page.svelte';
  import SettingsAppVersion from '$lib/components/SettingsAppVersion.svelte';
  import SettingsChangeTheme from '$lib/components/SettingsChangeTheme.svelte';
  import SettingsCheckForUpdate from '$lib/components/SettingsCheckForUpdate.svelte';

</script>

{#snippet iconsRight()}
  <!-- <Button
    icon={AIcon}
    iconOnly
    href="https://speirs.dev"
    target="_blank"
  >
    Visit speirs.dev
  </Button> -->
  <Button
    icon={GithubIcon}
    iconOnly
    href="https://github.com/afspeirs/note-me"
    target="_blank"
  >
    Visit github.com/afspeirs/note-me
  </Button>
{/snippet}

<Page
  title="Settings"
  {iconsRight}
>
  <ul role="list">
    <li>
      <SettingsAppVersion />
      <SettingsCheckForUpdate />
    </li>
    <li aria-hidden="true"><hr class="mx-3 border-gray-300 dark:border-gray-400" /></li>
    <li>
      <SettingsChangeTheme />
    </li>
  </ul>
</Page>

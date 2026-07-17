<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import AIcon from '$lib/components/icons/AIcon.svelte';
  import GithubIcon from '$lib/components/icons/GithubIcon.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import SettingsAppVersion from '$lib/components/SettingsAppVersion.svelte';
  import SettingsChangeTheme from '$lib/components/SettingsChangeTheme.svelte';
  import SettingsCheckForUpdate from '$lib/components/SettingsCheckForUpdate.svelte';
  import Tooltip from '$lib/components/Tooltip.svelte';
  import { modal } from '$lib/context/modal.svelte';

  function onClose() {
    modal.close();
  }
</script>

{#snippet iconsRight()}
  <Tooltip content="Visit speirs.dev">
    <Button
      icon={AIcon}
      iconClassName="fill-black dark:fill-white"
      iconOnly
      href="https://speirs.dev"
    >
      Visit speirs.dev
    </Button>
  </Tooltip>
  <Tooltip align="end" content="Visit github.com/afspeirs/note-me">
    <Button
      icon={GithubIcon}
      iconClassName="fill-black dark:fill-white"
      iconOnly
      href="https://github.com/afspeirs/note-me"
    >
      Visit github.com/afspeirs/note-me
    </Button>
  </Tooltip>
{/snippet}

<Modal
  title="Settings"
  {iconsRight}
  {onClose}
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
</Modal>

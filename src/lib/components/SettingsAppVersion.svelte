<script lang="ts">
  import { WrenchIcon } from 'lucide-svelte';

  import { style } from '$lib/components/Button.svelte';
</script>

<div class="m-card-gap">
  <div class="{style.withText} relative text-dark dark:text-light select-none">
    <WrenchIcon class="size-6" aria-hidden="true" />
    <div>
      <p>App version</p>
      <p class="text-gray-500 dark:text-gray-400">{import.meta.env.APP_VERSION}</p>
    </div>
  </div>
</div>

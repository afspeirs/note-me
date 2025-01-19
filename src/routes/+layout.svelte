<script lang="ts">
  import Toaster from '$lib/components/Toaster.svelte';
  import '$lib/utils/registerServiceWorker';
  import '$lib/utils/webmanifest-apple';
  import '../app.css';

  let { children } = $props();
</script>

<svelte:head>
  <title>NoteMe</title>
</svelte:head>

{@render children()}

<Toaster />

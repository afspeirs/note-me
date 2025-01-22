<script lang="ts">
  import { page } from '$app/state';
  import Page from '$lib/components/Page.svelte';
  import { fileSystem, readFile } from '$lib/context/file-system.svelte';

  const { id } = page.params;

  const files = $derived(fileSystem.folder?.children.flatMap((child) => {
    if (child.kind === 'directory') {
      return child.children;
    }
    return child;
  }));

  const file = $derived(files?.find((file) => file.id === id));

  $inspect({
    id,
    files,
    file,
  });

  const fileContents = $derived(file?.kind === 'file' ? readFile(file?.handle) : '');
</script>

<Page title={file?.name}>
  {#await fileContents}
    Loading
  {:then text}
    {console.log(text)}
    <textarea
      value={text}
    ></textarea>
  {/await}
</Page>

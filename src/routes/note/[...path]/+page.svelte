<script lang="ts">
  import { PencilIcon, SaveIcon, Trash2Icon } from 'lucide-svelte';
  import { marked } from 'marked';

  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import Button from '$lib/components/Button.svelte';
  import Page from '$lib/components/Page.svelte';
  import Prose from '$lib/components/Prose.svelte';
  import Tooltip from '$lib/components/Tooltip.svelte';
  import { deleteFile, getFileEntryFromId, readFile, writeFile } from '$lib/context/file-system.svelte';

  let { data } = $props();

  let fileEntry = $derived(getFileEntryFromId(data.params.path));
  const fileContents = $derived(fileEntry?.kind === 'file' ? readFile(fileEntry.handle) : '');
  let edit = $state(false);
  let text = $state('');

  async function saveFile() {
    if (fileEntry?.kind === 'file' && text !== await fileContents) {
      await writeFile(fileEntry.handle, text);
    }
  }

  async function setText() {
    if (!edit) {
      text = await fileContents;
    }
  }

  async function toggleEdit() {
    if (edit) {
      await saveFile();
    }
    edit = !edit;
  }

  async function handleDeleteNote() {
    if (fileEntry?.kind === 'file') {
      // TODO: Replace with a dialog
      // eslint-disable-next-line no-alert
      const confirm = window.confirm('Are you sure you want to delete this note?');

      if (confirm) {
        await deleteFile(fileEntry.handle).then(() => {
          goto(resolve('/'));
        });
      }
    }
  }

  $effect(() => {
    setText();
  });
</script>

<svelte:window
  on:keydown={(event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
      event.preventDefault();
      toggleEdit();
    }
  }}
/>

{#snippet iconsRight()}
  <Tooltip content="{edit ? 'Save' : 'Edit'} Note">
    <Button
      icon={edit ? SaveIcon : PencilIcon}
      iconOnly
      onclick={toggleEdit}
    >
      {edit ? 'Save' : 'Edit'} Note
    </Button>
  </Tooltip>
  <Tooltip content="Delete Note">
    <Button
      icon={Trash2Icon}
      iconOnly
      onclick={handleDeleteNote}
    >
      Delete Note
    </Button>
  </Tooltip>
{/snippet}

<Page
  title={fileEntry?.name}
  {iconsRight}
>
  {#await fileContents then fetchedText}
    {#if edit}
      <textarea
        name="note-text"
        id="note-text"
        placeholder="What's on your mind?"
        bind:value={text}
        class="block w-full h-full px-4 pt-1 pb-safe-offset-4 bg-transparent font-mono text-lg border-none outline-hidden resize-none overflow-auto"
      ></textarea>
    {:else}
      <Prose>
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html marked(fetchedText)}
      </Prose>
    {/if}
  {/await}
</Page>

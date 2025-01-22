<script lang="ts">
  import { marked } from 'marked';

  import { page } from '$app/state';
  import Button from '$lib/components/Button.svelte';
  import Page from '$lib/components/Page.svelte';
  import { fileSystem, readFile, writeFile } from '$lib/context/file-system.svelte';
  import { classNames } from '$lib/utils/classNames';
  import { PencilIcon, SaveIcon, Trash2Icon } from 'lucide-svelte';

  const { id } = page.params;

  const files = $derived(fileSystem.folder?.children.flatMap((child) => {
    if (child.kind === 'directory') {
      return child.children;
    }
    return child;
  }));

  const file = $derived(files?.find((file) => file.id === id));
  const fileContents = $derived(file?.kind === 'file' ? readFile(file?.handle) : '');
  let edit = $state(false);
  let text = $state('');

  async function saveFile() {
    if (file?.kind === 'file' && text !== await fileContents) {
      await writeFile(file.handle, text);
    }
  }

  async function setText() {
    if (!edit) {
      text = await fileContents;
    }
  }

  $effect(() => {
    setText();
  });
</script>

{#snippet iconsRight()}
  <Button
    icon={edit ? SaveIcon : PencilIcon}
    iconOnly
    onclick={async () => {
      if (edit) {
        await saveFile();
      }
      edit = !edit;
    }}
  >
    {edit ? 'Save' : 'Edit'} Note
  </Button>
  <Button
    icon={Trash2Icon}
    iconOnly
    disabled
  >
    Delete Note
  </Button>
{/snippet}

<Page
  title={file?.name}
  {iconsRight}
>
  {#await fileContents then fetchedText}
    {#if edit}
      <textarea
        name="note-text"
        id="note-text"
        placeholder="What's on your mind?"
        bind:value={text}
        class="block w-full h-full px-4 pt-1 pb-safe-offset-4 bg-transparent font-mono text-lg border-none outline-none resize-none overflow-auto"
      ></textarea>
    {:else}
      <div
        class={classNames(
          'w-full h-full px-4 pt-1 pb-safe-offset-4 overflow-auto prose dark:prose-invert',
          'prose-headings:mb-2 prose-headings:mt-4 first:prose-headings:mt-0 prose-a:text-link',
          'prose-ol:m-0 prose-ul:m-0 prose-li:relative prose-li:my-1 prose-code:whitespace-break-spaces',
        )}
      >
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html marked(fetchedText)}
      </div>
    {/if}
  {/await}
</Page>

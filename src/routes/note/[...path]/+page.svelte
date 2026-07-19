<script lang="ts">
  import { BoldIcon, HeadingIcon, ItalicIcon, ListIcon, ListTodoIcon, PencilIcon, SaveIcon, Trash2Icon } from '@lucide/svelte';
  import { marked } from 'marked';

  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import Button from '$lib/components/Button.svelte';
  import Page from '$lib/components/Page.svelte';
  import Prose from '$lib/components/Prose.svelte';
  import Tooltip from '$lib/components/Tooltip.svelte';
  import { deleteFile, getFileEntryFromId, readFile, writeFile } from '$lib/context/file-system.svelte';
  import { modal } from '$lib/context/modal.svelte';

  let { data } = $props();

  let fileEntry = $derived(getFileEntryFromId(data.params.path));
  const fileContents = $derived(fileEntry?.kind === 'file' ? readFile(fileEntry.handle) : '');
  let edit = $state(false);
  let text = $state('');
  let textareaRef: HTMLTextAreaElement | null = $state(null);

  function removeFrontmatter(markdown: string): string {
    // Match frontmatter: starts with ---, followed by content, ends with ---
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
    return markdown.replace(frontmatterRegex, '');
  }

  async function saveFile() {
    if (fileEntry?.kind === 'file' && text !== await fileContents) {
      await writeFile(fileEntry.handle, text);
    }
  }

  async function setText() {
    if (!edit) text = await fileContents;
  }

  async function toggleEdit() {
    if (edit) await saveFile();
    edit = !edit;
  }

  function handleDeleteNote() {
    modal.open('confirm', {
      onConfirm: async () => {
        if (fileEntry?.kind === 'file') {
          await deleteFile(fileEntry.handle);
          goto(resolve('/'));
        }
      },
      data: {
        title: 'Confirm Delete',
        message: `Are you sure you want to delete "${fileEntry?.name}"?`,
        description: 'This action cannot be undone.',
        confirmText: 'Delete Note',
      },
    });
  }

  type MarkdownType = 'bold' | 'italic' | 'heading' | 'list' | 'list-todo' | 'wikilink' | 'tag';
  function applyMarkdown(type: MarkdownType) {
    if (!textareaRef) return;

    textareaRef.focus();
    const start = textareaRef.selectionStart;
    const end = textareaRef.selectionEnd;
    const selection = text.substring(start, end) || '';

    let replacement = '';
    let cursorOffset = 0;

    switch(type) {
      case 'bold':
        replacement = `**${selection}**`;
        cursorOffset = selection ? replacement.length : 2;
        break;
      case 'italic':
        replacement = `_${selection}_`;
        cursorOffset = selection ? replacement.length : 1;
        break;
      case 'heading':
        replacement = `# ${selection}`;
        cursorOffset = replacement.length;
        break;
      case 'list':
        replacement = `\n- ${selection}`;
        cursorOffset = replacement.length;
        break;
      case 'list-todo':
        replacement = `\n- [ ] ${selection}`;
        cursorOffset = replacement.length;
        break;
      case 'wikilink':
        replacement = `[[${selection}]]`;
        cursorOffset = selection ? replacement.length : 2;
        break;
      case 'tag':
        replacement = `#${selection}`;
        cursorOffset = replacement.length;
        break;
    }

    textareaRef.setSelectionRange(start, end);
    document.execCommand('insertText', false, replacement);

    const newCursorPos = start + cursorOffset;
    textareaRef.setSelectionRange(newCursorPos, newCursorPos);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (!textareaRef) return;

    if (event.ctrlKey || event.metaKey) {
      if (event.key === 's' || event.key === 'e') {
        event.preventDefault();
        event.stopPropagation();
        toggleEdit();
        return;
      }
      if (event.key === 'b') {
        event.preventDefault();
        applyMarkdown('bold');
        return;
      }
      if (event.key === 'i') {
        event.preventDefault();
        applyMarkdown('italic');
        return;
      }
      // if (event.key === 'k') {
      //   event.preventDefault();
      //   applyMarkdown('wikilink');
      //   return;
      // }
      // if (event.key === 'h') {
      //   event.preventDefault();
      //   applyMarkdown('tag');
      //   return;
      // }
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      textareaRef.focus();
      document.execCommand('insertText', false, '\t');
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      textareaRef.focus();

      const start = textareaRef.selectionStart;
      // const end = textareaRef.selectionEnd;

      const textUpToCursor = text.substring(0, start);
      const currentLineStartIdx = textUpToCursor.lastIndexOf('\n') + 1;
      const currentLine = textUpToCursor.substring(currentLineStartIdx);

      /** Matches spaces/tabs, followed by - [ ] or - [x] and optional spaces */
      const listCheckRegex = /^([ \t]*- \[[ x]\]\s+)/;
      /** Matches spaces/tabs, followed by -, *, or + and optional spaces (e.g., "  - ") */
      const bulletRegex = /^([ \t]*[-*+]\s+)/;
      /** Matches spaces/tabs, followed by digits and a dot, and optional spaces (e.g., "  1. ") */
      const numberRegex = /^([ \t]*)(\d+)(\.\s+)/;

      let listMatch = currentLine.match(listCheckRegex);
      let bulletMatch = currentLine.match(bulletRegex);
      let numberMatch = currentLine.match(numberRegex);

      /** Matches "- [ ] " or "- [x] " with nothing following them */
      const emptyListCheckRegex = /^([ \t]*- \[[ x]\]\s*)$/;
      /** Matches "- " with nothing following them */
      const emptyBulletRegex = /^([ \t]*[-*+]\s*)$/;
      /** Matches "1. " with nothing following them */
      const emptyNumberRegex = /^([ \t]*\d+\.\s*)$/;

      if (emptyListCheckRegex.test(currentLine) || emptyBulletRegex.test(currentLine) || emptyNumberRegex.test(currentLine)) {
        // Select the current line's marker and clear it, falling back to a normal line break
        textareaRef.setSelectionRange(currentLineStartIdx, start);
        document.execCommand('insertText', false, '\n');
      } else if (listMatch) {
        // Continue task list by generating unchecked tasks default
        const marker = listMatch[1].replace('[x]', '[ ]');
        document.execCommand('insertText', false, `\n${marker}`);
      } else if (bulletMatch) {
        const marker = bulletMatch[1];
        document.execCommand('insertText', false, `\n${marker}`);
      } else if (numberMatch) {
        const indentation = numberMatch[1];
        const currentNumber = parseInt(numberMatch[2], 10);
        const spacing = numberMatch[3];

        const nextMarker = `${indentation}${currentNumber + 1}${spacing}`;
        document.execCommand('insertText', false, `\n${nextMarker}`);
      } else {
        document.execCommand('insertText', false, '\n');
      }
    }
  }

  $effect(() => {
    setText();
  });

  // marked.use({
  //   extensions: [
  //     {
  //       name: 'wikilink',
  //       level: 'inline',
  //       start(src) { return src.indexOf('[['); },
  //       tokenizer(src) {
  //         const rule = /^\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/;
  //         const match = rule.exec(src);
  //         if (match) {
  //           return {
  //             type: 'wikilink',
  //             raw: match[0],
  //             href: `/notes/${encodeURIComponent(match[1].trim())}`,
  //             text: (match[2] || match[1]).trim(),
  //           };
  //         }
  //         return undefined;
  //       },
  //       renderer(token) {
  //         return `<a class="wikilink underline text-primary" href="${token.href}">${token.text}</a>`;
  //       },
  //     },
  //     {
  //       name: 'tag',
  //       level: 'inline',
  //       start(src) { return src.indexOf('#'); },
  //       tokenizer(src) {
  //         // Ensure it's not a Markdown Header (e.g., "# " or "## ")
  //         if (/^#+\s/.test(src)) return undefined;

  //         // Match a tag. We capture valid characters: alphanumeric, underscores, hyphens
  //         const rule = /^#([a-zA-Z0-9_-]+)/;
  //         const match = rule.exec(src);
  //         if (match) {
  //           return {
  //             type: 'tag',
  //             raw: match[0],
  //             href: `?search=${encodeURIComponent(match[1])}`,
  //             text: match[0],
  //           };
  //         }
  //         return undefined;
  //       },
  //       renderer(token) {
  //         return `<a class="tag font-medium text-secondary hover:underline" href="${token.href}">${token.text}</a>`;
  //       },
  //     },
  //   ],
  // });
</script>

<svelte:window
  on:keydown={(event) => {
    if ((event.ctrlKey || event.metaKey) && (event.key === 'e' || event.key === 's')) {
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
  <Tooltip align="end" content="Delete Note">
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
    <div class="flex flex-col h-full w-full">
      {#if edit}
        <textarea
          bind:this={textareaRef}
          name="note-text"
          id="note-text"
          placeholder="What's on your mind?"
          bind:value={text}
          onkeydown={handleKeyDown}
          class="block w-full flex-1 px-4 pt-4 pb-safe-offset-4 bg-transparent font-mono text-lg border-none outline-hidden resize-none overflow-auto ring-0"
        ></textarea>

        <div class="flex items-center gap-card-gap p-card-gap">
          <Tooltip content="Bold (Ctrl+B)">
            <Button icon={BoldIcon} iconOnly onclick={() => applyMarkdown('bold')}>Bold</Button>
          </Tooltip>
          <Tooltip content="Italic (Ctrl+I)">
            <Button icon={ItalicIcon} iconOnly onclick={() => applyMarkdown('italic')}>Italic</Button>
          </Tooltip>
          <Tooltip content="Heading">
            <Button icon={HeadingIcon} iconOnly onclick={() => applyMarkdown('heading')}>Heading</Button>
          </Tooltip>
          <!-- <Tooltip content="Tag">
            <Button icon={HashIcon} iconOnly onclick={() => applyMarkdown('hashtag')}>Tag</Button>
          </Tooltip> -->
          <!-- <Tooltip content="Wikilink (Ctrl+K)">
            <Button icon={LinkIcon} iconOnly onclick={() => applyMarkdown('wikilink')}>Link</Button>
          </Tooltip> -->
          <Tooltip content="Bullet List">
            <Button icon={ListIcon} iconOnly onclick={() => applyMarkdown('list')}>List</Button>
          </Tooltip>
          <Tooltip content="Todo List">
            <Button icon={ListTodoIcon} iconOnly onclick={() => applyMarkdown('list-todo')}>List</Button>
          </Tooltip>
        </div>
      {:else}
        <Prose>
          <!-- eslint-disable-next-line svelte/no-at-html-tags -->
          {@html marked(removeFrontmatter(fetchedText))}
        </Prose>
      {/if}
    </div>
  {/await}
</Page>

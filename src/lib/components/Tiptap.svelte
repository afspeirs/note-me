<script lang="ts">
  import { Editor } from '@tiptap/core';
  import { Markdown } from '@tiptap/markdown';
  import { StarterKit } from '@tiptap/starter-kit';
  import { onDestroy, onMount } from 'svelte';

  type TiptapProps = {
    content: string;
  };

  let { content }: TiptapProps = $props();

  $inspect(content);

  let element: HTMLDivElement | null = $state(null);
  let editorState: { editor: Editor | null } = $state({ editor: null });

  onMount(() => {
    editorState.editor = new Editor({
      element,
      extensions: [
        StarterKit,
        Markdown,
      ],
      editorProps: {
        attributes: {
          class: [
            'max-w-full w-full h-full px-4 pt-1 pb-safe-offset-4 overflow-auto prose dark:prose-invert',
            'prose-headings:mb-2 prose-headings:mt-4 prose-headings:first:mt-0 prose-a:text-link',
            'prose-ol:m-0 prose-ul:m-0 prose-li:relative prose-li:m-1',
            '[&_li>p]:m-0',
            '[&_li:has(input)]:list-none [&_li:has(input)]:-ml-4 [&_li>input]:relative [&_li>input]:-left-2',
            '[&_input]:text-primary',
            'prose-code:whitespace-break-spaces',
            'bg-transparent font-mono border-none outline-hidden focus:outline-solid resize-none overflow-auto',
          ].join(' '),
        },
      },
      content,
      contentType: 'markdown',
      onUpdate: ({ editor }) => {
        console.log(editor.getMarkdown());
      },
      onTransaction: ({ editor }) => {
        // Update the state signal to force a re-render
        editorState = { editor };
      },
    });
  });
  onDestroy(() => {
    editorState.editor?.destroy();
  });
</script>

<div style="position: relative" class="app">
  {#if editorState.editor}
    <div class="fixed-menu">
      <button
        onclick={() => editorState.editor?.chain().focus().toggleHeading({ level: 1 }).run()}
        class:active={editorState.editor.isActive('heading', { level: 1 })}
      >
        H1
      </button>
      <button
        onclick={() => editorState.editor?.chain().focus().toggleHeading({ level: 2 }).run()}
        class:active={editorState.editor.isActive('heading', { level: 2 })}
      >
        H2
      </button>
      <button onclick={() => editorState.editor?.chain().focus().setParagraph().run()} class:active={editorState.editor.isActive('paragraph')}>
        P
      </button>
    </div>
  {/if}

  <div bind:this={element}></div>
</div>

<style>
  button.active {
    background: black;
    color: white;
  }
</style>

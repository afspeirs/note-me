<script lang="ts">
  import type { Snippet } from 'svelte';

  type ProseProps = {
    children: Snippet;
  };

  let {
    children,
  }: ProseProps = $props();
</script>

<div
  class="
    w-full h-full px-4 pt-1 pb-safe-offset-4 overflow-auto prose dark:prose-invert
    prose-headings:mb-2 prose-headings:mt-4 first:prose-headings:mt-0 prose-a:text-link
    prose-ol:m-0 prose-ul:m-0 prose-li:relative prose-li:m-1
    [&_li>p]:m-0
    [&_input]:text-primary
    prose-code:whitespace-break-spaces
  "
>
  {@render children?.()}
</div>

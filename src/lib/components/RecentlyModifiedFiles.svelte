<script lang="ts">
  import { ClockIcon, FileTextIcon } from '@lucide/svelte';

  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import ButtonWithTooltip from '$lib/components/ButtonWithTooltip.svelte';
  import { fileSystem, formatRelativeTime, type FileSystemFileEntry } from '$lib/context/file-system.svelte';

  const recentFilesLimit = 5;

  const recentFiles = $derived.by(() => {
    if (!fileSystem.cache) return [];

    const files: FileSystemFileEntry[] = [];

    // Collect all files from cache
    for (const entry of fileSystem.cache.values()) {
      if (entry.kind === 'file') {
        files.push(entry);
      }
    }

    // Sort by last modified date (newest first) and take top X
    return files
      .sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime())
      .slice(0, recentFilesLimit);
  });
</script>

{#if recentFiles.length > 0}
  <div class="mt-auto">
    <div class="flex items-center gap-2 mb-3">
      <ClockIcon class="w-5 h-5" />
      <h2 class="text-xl font-semibold">Recently Modified</h2>
    </div>

    <div class="flex flex-col gap-2">
      {#each recentFiles as file (file.id)}
        <ButtonWithTooltip
          active
          icon={FileTextIcon}
          onclick={() => goto(resolve(`/note/${file.id}`))}
          tooltip={file.id}
          tooltipProps={{
            side: 'top',
          }}
        >
          {file.name}

          {#snippet secondaryAction()}
            <span class="text-nowrap">{formatRelativeTime(file.lastModified)}</span>
          {/snippet}
        </ButtonWithTooltip>
      {/each}
    </div>
  </div>
{/if}

<script lang="ts">
  import { content, refreshFolder, restoreFolder, selectFolder } from '$lib/context/content.svelte';

  $inspect(content.folder);

  restoreFolder();
</script>

<style>
  .file-list li {
    padding: 5px 32px;
  }
</style>

<div>
  <button onclick={selectFolder}>Select Folder</button>
  <button onclick={refreshFolder} disabled={!content.folderHandle}>Refresh Folder</button>

  {#if content.folder}
    <ul class="file-list">
      <li>
        <strong>{content.folder.name}</strong>
        <ul>
          {#each content.folder.children as child}
            {#if child.kind === 'file'}
              <li>
                <button>
                  {child.name}
                </button>
              </li>
            {:else if child.kind === 'directory'}
              <li>
                <div>
                  <strong>{child.name}</strong>
                  <ul>
                    {#each child.children as subChild}
                      {#if subChild.kind === 'file'}
                        <li>
                          {subChild.name}
                        </li>
                      {:else if subChild.kind === 'directory'}
                        <li>
                          <div>
                            <strong>{subChild.name}</strong>
                            {#if subChild.children.length > 0}
                              <ul>
                                {#each subChild.children as subSubChild}
                                  <li>
                                    {#if subSubChild.kind === 'file'}
                                      {subSubChild.name}
                                    {:else}
                                      <strong>{subSubChild.name}</strong>
                                    {/if}
                                  </li>
                                {/each}
                              </ul>
                            {/if}
                          </div>
                        </li>
                      {/if}
                    {/each}
                  </ul>
                </div>
              </li>
            {/if}
          {/each}
        </ul>
      </li>
    </ul>
  {:else}
    <p>No folders selected</p>
  {/if}
</div>

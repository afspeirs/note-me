<script lang="ts">
  import { fileSystem, refreshFolder, restoreFolder, selectFolder } from '$lib/context/file-system.svelte';

  $inspect(fileSystem.folder);

  restoreFolder();
</script>

<style>
  .file-list li {
    padding: 5px 32px;
  }
</style>

<div>
  <button onclick={selectFolder}>Select Folder</button>
  <button onclick={refreshFolder} disabled={!fileSystem.folderHandle}>Refresh Folder</button>

  {#if fileSystem.folder}
    <ul class="file-list">
      <li>
        <strong>{fileSystem.folder.name}</strong>
        <ul>
          {#each fileSystem.folder.children as child}
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

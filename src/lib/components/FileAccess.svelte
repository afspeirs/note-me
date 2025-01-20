<script lang="ts">
  import { openDB } from 'idb';

  import { content, type ContentEntry, type ContentFolderEntry } from '$lib/context/content.svelte';

  let fileContent: string | null = $state(null);

  $inspect(content.folder);

  const DB_NAME = 'file-system-db';
  const STORE_NAME = 'handles';

  async function initDB() {
    return openDB(DB_NAME, 1, {
      upgrade(db) {
        db.createObjectStore(STORE_NAME);
      },
    });
  }

  async function saveHandle(handle: FileSystemDirectoryHandle) {
    const db = await initDB();
    await db.put(STORE_NAME, handle, 'folderHandle');
  }

  async function loadHandle(): Promise<FileSystemDirectoryHandle | null> {
    const db = await initDB();
    return await db.get(STORE_NAME, 'folderHandle') || null;
  }

  async function selectFolder() {
    try {
      content.folderHandle = await window.showDirectoryPicker();
      await saveHandle(content.folderHandle);

      content.folder = await readDirectory(content.folderHandle);
    } catch (error) {
      console.error('Error accessing folder:', error); // eslint-disable-line no-console
    }
  }

  async function refreshFolder() {
    if (content.folderHandle) {
      content.folder = await readDirectory(content.folderHandle);
    }
  }

  async function restoreFolder() {
    content.folderHandle = await loadHandle();
    if (content.folderHandle) {
      content.folder = await readDirectory(content.folderHandle);
    }
  }

  async function readDirectory(directoryHandle: FileSystemDirectoryHandle): Promise<ContentFolderEntry> {
    const children: ContentEntry[] = [];

    for await (const entry of directoryHandle.values()) {
      if (entry.name.startsWith('.')) continue;
      if (entry.kind === 'directory') {
        const subFolder = await readDirectory(entry);
        children.push(subFolder);
      } else if (entry.kind === 'file') {
        children.push({ name: entry.name, handle: entry, kind: 'file' });
      }
    }

    children.sort((a, b) => a.name.localeCompare(b.name));

    return {
      name: directoryHandle.name,
      kind: 'directory',
      children,
    };
  }

  async function readFile(fileHandle: FileSystemFileHandle) {
    try {
      const file = await fileHandle.getFile();
      const text = await file.text();
      fileContent = text;
    } catch (error) {
      console.error('Error reading file:', error); // eslint-disable-line no-console
    }
  }

  restoreFolder();
</script>

<style>
  .file-list {
    list-style-type: none;
    padding: 0;
  }

  .file-list li {
    padding: 5px 0;
    cursor: pointer;
    color: blue;
    text-decoration: underline;
  }

  .file-list li:hover {
    text-decoration: none;
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
                <button onclick={() => readFile(child.handle)}>
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
                          <button onclick={() => readFile(subChild.handle)}>
                            {subChild.name}
                          </button>
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
                                      <button onclick={() => readFile(subSubChild.handle)}>
                                        {subSubChild.name}
                                      </button>
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

  {#if fileContent}
    <h3>File Content:</h3>
    <pre>{fileContent}</pre>
  {/if}
</div>

<script lang="ts">
  import { openDB } from 'idb';

  type FileEntry = { name: string; handle: FileSystemFileHandle };

  let folderHandle: FileSystemDirectoryHandle | null = $state(null);
  let files: FileEntry[] = $state([]);
  let fileContent: string | null = $state(null);

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
    return (await db.get(STORE_NAME, 'folderHandle')) || null;
  }

  async function selectFolder() {
    try {
      folderHandle = await window.showDirectoryPicker();
      await saveHandle(folderHandle);

      files = [];
      await readDirectory(folderHandle);
    } catch (err) {
      console.error('Error accessing folder:', err);
    }
  }

  async function refreshFolder() {
    if (folderHandle) {
      files = [];
      await readDirectory(folderHandle);
    }
  }

  async function restoreFolder() {
    folderHandle = await loadHandle();
    if (folderHandle) {
      files = [];
      await readDirectory(folderHandle);
    }
  }

  async function readDirectory(directoryHandle: FileSystemDirectoryHandle, path = '') {
    if (path.startsWith('.')) return;
    for await (const entry of directoryHandle.values()) {
      if (entry.kind === 'file') {
        files.push({ name: `${path}${entry.name}`, handle: entry });
      } else if (entry.kind === 'directory') {
        await readDirectory(entry, `${path}${entry.name}/`);
      }
    }
  }

  async function readFile(fileHandle: FileSystemFileHandle) {
    try {
      const file = await fileHandle.getFile();
      const text = await file.text();
      fileContent = text;
    } catch (err) {
      console.error('Error reading file:', err);
    }
  }

  // Automatically attempt to restore the folder handle on component mount
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
  <button onclick={refreshFolder} disabled={!folderHandle}>Refresh Folder</button>

  {#if files.length > 0}
    <ul class="file-list">
      {#each files as { name, handle }}
        <li>
          <button onclick={() => readFile(handle)}>
            {name}
          </button>
        </li>
      {/each}
    </ul>
  {:else}
    <p>No files selected</p>
  {/if}

  {#if fileContent}
    <h3>File Content:</h3>
    <pre>{fileContent}</pre>
  {/if}
</div>

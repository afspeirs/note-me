import { openDB } from 'idb';
import { SvelteSet } from 'svelte/reactivity';

import { addToast } from '$lib/components/Toaster.svelte';

type FileSystemBase = {
  id: string;
  name: string;
};

export type FileSystemFileEntry = FileSystemBase & {
  handle: FileSystemFileHandle;
  kind: 'file';
  parent: FileSystemDirectoryHandle;
};

export type FileSystemFolderEntry = FileSystemBase & {
  children: FileSystemEntry[];
  handle: FileSystemDirectoryHandle
  kind: 'directory';
};

export type FileSystemEntry = FileSystemFileEntry | FileSystemFolderEntry;

type FileSystemCache = Map<string, FileSystemEntry>;

type FileSystem = {
  folderHandle: FileSystemDirectoryHandle | null;
  folder: FileSystemFolderEntry | null;
  cache: FileSystemCache | null,
};

export const fileSystem: FileSystem = $state({
  folderHandle: null,
  folder: null,
  cache: null,
});

const DB_NAME = 'note-me-file-system-db';
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

export async function selectFolder() {
  if (!window.showDirectoryPicker) {
    addToast({
      data: {
        title: 'Error',
        description: 'Unfortunately, your current browser doesn\'t allow direct folder access.',
      },
    });
    return;
  }

  try {
    fileSystem.folderHandle = await window.showDirectoryPicker();
    await saveHandle(fileSystem.folderHandle);

    const { root, cache } = await readDirectory(fileSystem.folderHandle);
    fileSystem.folder = root;
    fileSystem.cache = cache;
  } catch (error) {
    console.error('Error accessing folder:', error); // eslint-disable-line no-console
  }
}

export async function refreshFolder() {
  if (fileSystem.folderHandle) {
    const { root, cache } = await readDirectory(fileSystem.folderHandle);
    fileSystem.folder = root;
    fileSystem.cache = cache;
  }
}

export async function restoreFolder() {
  fileSystem.folderHandle = await loadHandle();
  if (fileSystem.folderHandle) {
    const { root, cache } = await readDirectory(fileSystem.folderHandle);
    fileSystem.folder = root;
    fileSystem.cache = cache;
  }
}

async function readDirectory(
  directoryHandle: FileSystemDirectoryHandle,
  parentPath: string = '',
  cache: FileSystemCache = new Map(),
) {
  async function recursiveScan(
    handle: FileSystemDirectoryHandle,
    path: string = '',
  ): Promise<FileSystemFolderEntry> {
    const children: FileSystemEntry[] = [];
    const currentPath = path ? `${path}/${handle.name}` : handle.name;

    for await (const entry of handle.values()) {
      if (entry.name.startsWith('.')) continue;
      if (entry.kind === 'directory') {
        const subFolder = await recursiveScan(entry, currentPath);
        children.push(subFolder);
      } else {
        const fileEntry: FileSystemFileEntry = {
          id: `${currentPath}/${entry.name}`,
          name: entry.name,
          handle: entry,
          kind: 'file',
          parent: handle,
        };
        children.push(fileEntry);
        cache.set(fileEntry.id, fileEntry);
      }
    }

    const folderEntry: FileSystemFolderEntry = {
      id: currentPath,
      name: handle.name,
      handle: handle,
      kind: 'directory',
      children: children.sort((a, b) => {
        if (a.kind === 'directory' && b.kind !== 'directory') return -1;
        if (a.kind !== 'directory' && b.kind === 'directory') return 1;
        return a.name.localeCompare(b.name);
      }),
    };

    cache.set(currentPath, folderEntry);
    return folderEntry;
  }

  const root = await recursiveScan(directoryHandle, parentPath);

  return {
    root,
    cache
  };
}

export async function readFile(fileHandle: FileSystemFileHandle) {
  try {
    const file = await fileHandle.getFile();
    const text = await file.text();
    return text;
  } catch (error) {
    console.error('Error reading file:', error); // eslint-disable-line no-console
    throw error;
  }
}

export async function writeFile(fileHandle: FileSystemFileHandle, content: string) {
  try {
    const writable = await fileHandle.createWritable();
    await writable.write(content);
    await writable.close();

    await refreshFolder();
  } catch (error) {
    console.error('Error writing to file:', error); // eslint-disable-line no-console
    throw error;
  }
}

export async function createFile(folderHandle: FileSystemDirectoryHandle, fileName: string) {
  try {
    let newFileName = `${fileName}.md`;
    let counter = 1;

    // Check for existing files and create unique names if necessary
    const existingFiles = new SvelteSet<string>();
    for await (const entry of folderHandle.values()) {
      if (entry.kind === 'file') {
        existingFiles.add(entry.name);
      }
    }

    while (existingFiles.has(newFileName)) {
      newFileName = `${fileName} (${counter++}).md`;
    }

    // Create a new file handle in the specified folder
    const fileHandle = await folderHandle.getFileHandle(newFileName, { create: true });

    await writeFile(fileHandle, '');
    await refreshFolder();

    return fileHandle;
  } catch (error) {
    console.error('Error creating file:', error); // eslint-disable-line no-console
    throw error;
  }
}

export async function deleteFile(fileHandle: FileSystemFileHandle) {
  try {
    // @ts-expect-error - The remove method is not yet part of the official spec
    await fileHandle.remove();
    await refreshFolder();

    return fileHandle;
  } catch (error) {
    console.error('Error deleting file:', error); // eslint-disable-line no-console
    throw error;
  }
}

export function getFileFromId(id: string) {
  if (!fileSystem.cache) return null;

  const entry = fileSystem.cache.get(id);
  if (entry?.kind === 'directory') throw new Error(`This is a directory: ${id}`);
  return entry;
}

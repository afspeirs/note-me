import { openDB } from 'idb';

export type FileSystemFileEntry = {
  handle: FileSystemFileHandle;
  kind: 'file';
  name: string;
};
export type FileSystemFolderEntry = {
  children: FileSystemEntry[];
  kind: 'directory';
  name: string;
};
export type FileSystemEntry = FileSystemFileEntry | FileSystemFolderEntry;

type FileSystem = {
  folderHandle: FileSystemDirectoryHandle | null;
  folder: FileSystemFolderEntry | null;
};

export const fileSystem: FileSystem = $state({
  folderHandle: null,
  folder: null,
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
  try {
    fileSystem.folderHandle = await window.showDirectoryPicker();
    await saveHandle(fileSystem.folderHandle);

    fileSystem.folder = await readDirectory(fileSystem.folderHandle);
  } catch (error) {
    console.error('Error accessing folder:', error); // eslint-disable-line no-console
  }
}

export async function refreshFolder() {
  if (fileSystem.folderHandle) {
    fileSystem.folder = await readDirectory(fileSystem.folderHandle);
  }
}

export async function restoreFolder() {
  fileSystem.folderHandle = await loadHandle();
  if (fileSystem.folderHandle) {
    fileSystem.folder = await readDirectory(fileSystem.folderHandle);
  }
}

async function readDirectory(directoryHandle: FileSystemDirectoryHandle): Promise<FileSystemFolderEntry> {
  const children: FileSystemEntry[] = [];

  for await (const entry of directoryHandle.values()) {
    if (entry.name.startsWith('.')) continue;
    if (entry.kind === 'directory') {
      const subFolder = await readDirectory(entry);
      children.push(subFolder);
    } else if (entry.kind === 'file') {
      children.push({ name: entry.name, handle: entry, kind: 'file' });
    }
  }

  return {
    name: directoryHandle.name,
    kind: 'directory',
    children: children.sort((a, b) => a.name.localeCompare(b.name)),
  };
}

export async function readFile(fileHandle: FileSystemFileHandle) {
  try {
    const file = await fileHandle.getFile();
    const text = await file.text();
    return text;
  } catch (error) {
    console.error('Error reading file:', error); // eslint-disable-line no-console
    throw new Error('Error reading file');
  }
}

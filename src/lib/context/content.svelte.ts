export type ContentFileEntry = {
  handle: FileSystemFileHandle;
  kind: 'file';
  name: string;
};
export type ContentFolderEntry = {
  children: ContentEntry[];
  kind: 'directory';
  name: string;
};
export type ContentEntry = ContentFileEntry | ContentFolderEntry;

type Content = {
  folderHandle: FileSystemDirectoryHandle | null;
  folder: ContentFolderEntry | null;
};

export const content: Content = $state({
  folderHandle: null,
  folder: null,
});

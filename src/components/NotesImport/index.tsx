import { ArrowUpCircleIcon } from '@heroicons/react/24/outline';
import frontMatter from 'front-matter';
import type { ChangeEvent } from 'react';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useRxCollection } from 'rxdb-hooks';
import { useEventListener } from 'usehooks-ts';

import { importNotes } from '@/api/notes';
import type { NoteDocType } from '@/api/types';
import { Button } from '@/components/Button';
import { classNames } from '@/utils/classNames';
import { getTitle } from '@/utils/getTitle';
import { Modal } from '../Modal';
import type { ImportFile } from './types';

export function NotesImport() {
  const [open, setOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const collection = useRxCollection<NoteDocType>('notes');

  const [dragging, setDragging] = useState(false);
  const [filesToImport, setFilesToImport] = useState<ImportFile[]>([]);

  const onClose = () => {
    setOpen(false);
    setFilesToImport([]);
  };

  const handleFiles = (files: FileList) => {
    [...files].forEach((file) => {
      if (
        file.name.toLowerCase().endsWith('md')
        || file.type.toLowerCase().startsWith('text/')
      ) {
        const reader = new FileReader();
        reader.onload = () => {
          const fileInfo = frontMatter<NoteDocType>(reader.result as string);

          setFilesToImport((prevState) => [
            ...prevState,
            {
              ...fileInfo.attributes,
              text: fileInfo.body,
            },
          ]);
        };
        reader.readAsText(file);
      } else {
        toast.error(`"${file.name}" cannot be imported. Only Markdown and other text files are supported`);
      }
    });

    setDragging(false);
  };

  const handleDrag = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === 'dragenter' || event.type === 'dragover') {
      setDragging(true);
    } else if (event.type === 'dragleave') {
      setDragging(false);
    }
  };

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setDragging(false);

    if (event?.dataTransfer?.files?.[0]) {
      handleFiles(event.dataTransfer.files);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event?.target?.files?.[0]) {
      handleFiles(event.target.files);
    }
  };

  const onButtonClick = () => {
    if (!inputRef?.current) return;

    inputRef.current.click();
  };

  const handleImportNotes = () => {
    if (!collection) return;

    importNotes(collection, filesToImport)
      .then(onClose);
  };

  useEventListener('dragenter', handleDrag, formRef);
  useEventListener('dragenter', handleDrag, dropRef);
  useEventListener('dragleave', handleDrag, dropRef);
  useEventListener('dragover', handleDrag, dropRef);
  useEventListener('drop', handleDrop, dropRef);

  return (
    <div className="m-2">
      <Button
        active={open}
        Icon={ArrowUpCircleIcon}
        onClick={() => setOpen(true)}
      >
        Import Notes
      </Button>

      <Modal
        title="Import Notes"
        open={open}
        onClose={onClose}
      >
        {filesToImport?.length === 0 ? (
          <form
            ref={formRef}
            onSubmit={(e) => e.preventDefault()}
          >
            <label
              id="label-file-upload"
              htmlFor="input-file-upload"
              className={classNames(
                'mt-2 flex justify-center rounded-lg border-2 border-dashed px-6 py-20 select-none focus-within:border-primary dark:focus-within:border-primary',
                dragging ? 'border-primary dark:border-primary' : 'border-gray-900/25 dark:border-white',
              )}
            >
              <input
                ref={inputRef}
                type="file"
                accept="text/"
                className="sr-only"
                multiple
                onChange={handleChange}
              />
              <div className="text-center">
                <ArrowUpCircleIcon className="mx-auto h-12 w-12 text-gray-300 dark:text-white" aria-hidden="true" />

                <div className="mt-4 flex">
                  <button
                    type="button"
                    className="cursor-pointer font-semibold text-primary hover:text-current rounded-md focus-visible"
                    onClick={onButtonClick}
                  >
                    Upload a file
                  </button>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5">Markdown (.md) or any text file</p>
              </div>
            </label>
            {dragging && (
              <div ref={dropRef} id="drag-file-element" />
            )}
          </form>
        ) : (
          <div>
            <p className="mb-2">{`Create ${filesToImport.length} note${filesToImport.length > 1 ? 's' : ''}:`}</p>

            {filesToImport.map((file) => (
              <p key={file.text}>{`"${getTitle(file.text)}"`}</p>
            ))}

            <div className="flex justify-end gap-4 mt-6">
              <Button
                className="w-auto"
                onClick={() => setFilesToImport([])}
              >
                Clear
              </Button>
              <Button
                active
                className="w-auto"
                onClick={handleImportNotes}
              >
                Confirm
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRxData } from 'rxdb-hooks';

import type { NoteDocType } from '@/api/types';
import { Button } from '@/components/Button';
import { ModalConfirm } from '@/components/ModalConfirm';
import { formatDate } from '@/utils/formatDate';
import { getTitle } from '@/utils/getTitle';

export function NotesExport() {
  const [open, setOpen] = useState(false);
  const { result: notes } = useRxData<NoteDocType>(
    'notes',
    (collection) => collection.find({
      selector: {
        text: {
          $not: '',
        },
      },
    }),
  );

  const exportZipFile = async () => {
    const zip = new JSZip();
    const currentDate = formatDate({
      options: {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      },
    }).split('/').reverse().join('-');

    notes.filter((note) => note.text !== '').forEach((note) => {
      const fileName = getTitle(note.text);
      const contents = `---
        dateCreated: ${note.dateCreated}
        dateModified: ${note.dateModified}
        favourite: ${note.favourite || false}
      ---`
        .replace(/^\s+|\s+$/gm, '')
        .concat(`\n${note.text}`);

      zip.file(`${fileName}.md`, contents, {
        createFolders: false,
      });
    });

    return zip.generateAsync({ type: 'blob' })
      .then((blob) => saveAs(blob, `NoteMe_${currentDate}.zip`), (error: Error) => console.error(error)); // eslint-disable-line no-console
  };

  return (
    <div className="m-2">
      <Button
        active={open}
        disabled={notes.length === 0}
        Icon={ArrowDownCircleIcon}
        onClick={() => setOpen(true)}
      >
        Export Notes
      </Button>

      <ModalConfirm
        message={`Are you sure you want to export ${notes.length} note${notes.length > 1 ? 's' : ''}?`}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          exportZipFile()
            .then(() => {
              setOpen(false);
              toast(`${notes.length} note${notes.length > 1 ? 's have' : ' has'} been exported'`);
            });
        }}
        open={open}
      />
    </div>
  );
}

import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { ArrowDownCircleIcon } from 'lucide-react';
import { useState } from 'react';
import { useRxData } from 'rxdb-hooks';

import type { NoteDocType } from '@/api/types';
import { Button } from '@/components/Button';
import { ModalConfirm } from '@/components/ModalConfirm';
import { openToast } from '@/components/Toast';
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
      const fileName = getTitle(note.text)
        .replaceAll(/[^\w\s]/gi, ''); // Remove non-word characters (except spaces)

      const contents = `---
        date_created: ${note.date_created}
        date_modified: ${note.date_modified}
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
    <div className="m-card-gap">
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
              openToast({
                message: `${notes.length} note${notes.length > 1 ? 's have' : ' has'} been exported'`,
              });
            });
        }}
        open={open}
      />
    </div>
  );
}

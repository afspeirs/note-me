import {
  InformationCircleIcon,
  LockClosedIcon,
  LockOpenIcon,
  StarIcon as StarOutlineIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import {
  StarIcon as StarSolidIcon,
} from '@heroicons/react/24/solid';
import Markdown from 'markdown-to-jsx';
import { useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useNavigate, useParams } from 'react-router-dom';
import { useRxData } from 'rxdb-hooks';

import { deleteNote, favouriteNote, updateNote } from '@/api/notes';
import type { NoteDocType } from '@/api/types';
import { Button } from '@/components/Button';
import { ModalConfirm } from '@/components/ModalConfirm';
import { NotesMoreInformation } from '@/components/NotesMoreInformation';
import { Page } from '@/components/Page';
import { Tooltip } from '@/components/Tooltip';
import { classNames } from '@/utils/classNames';
import { getTitle } from '@/utils/getTitle';

export function Note() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [showMoreInformation, setShowMoreInformation] = useState(false);
  const [showDeleteNoteModal, setShowDeleteNoteModal] = useState(false);
  const [text, setText] = useState('');
  const { result: [note] } = useRxData<NoteDocType>(
    'notes',
    (collection) => collection.findOne(id),
  );

  const handleDeleteNote = () => {
    setShowDeleteNoteModal(false);
    deleteNote(note)
      .then(() => navigate('/', { replace: true }));
  };

  useHotkeys('ctrl+s, meta+s', () => setEdit((prevState) => !prevState), {
    enableOnFormTags: true,
    preventDefault: true,
  });

  useEffect(() => {
    const compare = !edit && id && text !== note?.text;

    if (compare) {
      updateNote(note, text);
    }
  }, [edit]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (note) {
      setText(note.text || '');
      setEdit(note.text === '');
    }
  }, [note]);

  return (
    <Page
      title="Note"
      icons={(
        <>
          <Tooltip label={`${edit ? 'Save' : 'Edit'} Note`}>
            <Button
              Icon={edit ? LockOpenIcon : LockClosedIcon}
              iconOnly
              onClick={() => setEdit((prevState) => !prevState)}
            >
              {`${edit ? 'Save' : 'Edit'} Note`}
            </Button>
          </Tooltip>
          <Tooltip label={`${note?.favourite ? 'Unfavourite' : 'Favourite'} Note`}>
            <Button
              Icon={note?.favourite ? StarSolidIcon : StarOutlineIcon}
              iconOnly
              onClick={() => favouriteNote(note)}
            >
              {`${note?.favourite ? 'Unfavourite' : 'Favourite'} Note`}
            </Button>
          </Tooltip>
          <Tooltip label="More information">
            <Button
              Icon={InformationCircleIcon}
              iconOnly
              onClick={() => setShowMoreInformation(true)}
            >
              More information
            </Button>
          </Tooltip>
          <NotesMoreInformation
            note={note}
            open={showMoreInformation}
            setOpen={setShowMoreInformation}
          />
          <Tooltip label="Delete Note">
            <Button
              Icon={TrashIcon}
              iconOnly
              onClick={() => setShowDeleteNoteModal(true)}
            >
              Delete Note
            </Button>
          </Tooltip>
          <ModalConfirm
            message={note && `Are you sure you want to delete "${getTitle(note.text)}"?`}
            onClose={() => setShowDeleteNoteModal(false)}
            onConfirm={handleDeleteNote}
            open={showDeleteNoteModal}
          />
        </>
      )}
    >
      <>
        {edit ? (
          <label htmlFor="note-text">
            <span className="sr-only">note body copy</span>
            <textarea
              name="note-text"
              id="note-text"
              value={text}
              onChange={(event) => setText(event.target.value)}
              className="block w-full h-full px-4 pt-1 pb-4 bg-transparent font-mono text-lg border-none outline-none resize-none overflow-auto"
            />
          </label>
        ) : (
          <Markdown
            className={classNames(
              'w-full h-full px-4 pt-1 pb-4 overflow-auto prose dark:prose-invert',
              'prose-headings:mb-2 prose-headings:mt-4 first:prose-headings:mt-0 prose-a:text-link',
              'prose-ol:m-0 prose-ul:m-0 prose-li:relative prose-li:my-1',
            )}
            options={{
              disableParsingRawHTML: true,
              forceWrapper: true,
              overrides: {
                // a: RendererLink,
                input: {
                  props: {
                    className: 'absolute -left-5 top-2 m-0 accent-primary',
                  },
                },
              },
            }}
          >
            {text}
          </Markdown>
        )}
      </>
    </Page>
  );
}

import {
  InfoIcon,
  PencilIcon,
  SaveIcon,
  Star as StarIcon,
  Trash2Icon as TrashIcon,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useNavigate, useParams } from 'react-router-dom';
import { useRxCollection, useRxData } from 'rxdb-hooks';

import { deleteNote, favouriteNote, updateNote } from '@/api/notes';
import type { NoteDocType, NoteQuery } from '@/api/types';
import { Button } from '@/components/Button';
import { Markdown } from '@/components/Markdown';
import { ModalConfirm } from '@/components/ModalConfirm';
import { NotesMoreInformation } from '@/components/NotesMoreInformation';
import { Page } from '@/components/Page';
import { Tooltip } from '@/components/Tooltip';
import { getTitle } from '@/utils/getTitle';
import { openToast } from '@/components/Toast';

const placeholderText = `
What is on your mind?

Start typing here to begin crafting your new note.
`.trim();

export function Note() {
  const { id } = useParams();
  const collection = useRxCollection<NoteDocType>('notes');
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [showMoreInformation, setShowMoreInformation] = useState(false);
  const [showDeleteNoteModal, setShowDeleteNoteModal] = useState(false);
  const [text, setText] = useState('');
  // TODO: can i do this better now that I need collection for deleteNote?
  const notesQuery = useCallback<NoteQuery>((collection2) => collection2.findOne(id), [id]);
  const { result: [note], isFetching } = useRxData<NoteDocType>('notes', notesQuery);

  const handleDeleteNote = () => {
    setShowDeleteNoteModal(false);

    if (!collection) throw new Error('No collection found');

    deleteNote(collection, note)
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
  }, [note?.text]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!note && !isFetching) {
      openToast({
        message: `No note found with an id of "${id}"`,
      });
      navigate('/', { replace: true });
    }
  }, [isFetching, note]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Page
      title={getTitle(note?.text)}
      titleHide
      icons={(
        <>
          <Tooltip content={`${edit ? 'Save' : 'Edit'} Note`}>
            <Button
              Icon={edit ? SaveIcon : PencilIcon}
              iconOnly
              onClick={() => setEdit((prevState) => !prevState)}
            >
              {`${edit ? 'Save' : 'Edit'} Note`}
            </Button>
          </Tooltip>
          <Tooltip content={`${note?.favourite ? 'Unfavourite' : 'Favourite'} Note`}>
            <Button
              Icon={StarIcon}
              IconClassName={note?.favourite ? 'fill-current' : ''}
              iconOnly
              onClick={() => favouriteNote(note)}
            >
              {`${note?.favourite ? 'Unfavourite' : 'Favourite'} Note`}
            </Button>
          </Tooltip>
          <Tooltip content="More information">
            <Button
              Icon={InfoIcon}
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
          <Tooltip content="Delete Note">
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
              placeholder={placeholderText}
              value={text}
              onChange={(event) => setText(event.target.value)}
              className="block w-full h-full px-4 pt-1 pb-safe-offset-4 bg-transparent font-mono text-lg border-none outline-none resize-none overflow-auto"
            />
          </label>
        ) : (
          <Markdown>
            {text}
          </Markdown>
        )}
      </>
    </Page>
  );
}

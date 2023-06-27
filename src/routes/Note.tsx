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

import { deleteNote, favouriteNote, updateNote } from '../api/notes';
import type { NoteDocType } from '../api/types';
import { ButtonIcon } from '../components/ButtonIcon';
import { Page } from '../components/Page';
import { classNames } from '../utils/classNames';

export function Note() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState('');
  const { result: [note] } = useRxData<NoteDocType>(
    'notes',
    (collection) => collection.findOne(id),
  );

  const handleDeleteNote = () => {
    const confirm = window.confirm('Are you sure you want to delete this note?'); // eslint-disable-line no-alert

    if (confirm) {
      deleteNote(note)
        .then(() => navigate('/', { replace: true }));
    }
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
          <ButtonIcon
            Icon={edit ? LockOpenIcon : LockClosedIcon}
            label={`${edit ? 'Save' : 'Edit'} Note`}
            onClick={() => setEdit((prevState) => !prevState)}
          />
          <ButtonIcon
            Icon={note?.favourite ? StarSolidIcon : StarOutlineIcon}
            label={`${note?.favourite ? 'Unfavourite' : 'Favourite'} Note`}
            onClick={() => favouriteNote(note)}
          />
          <ButtonIcon
            Icon={InformationCircleIcon}
            disabled
            label="View Note information"
            onClick={() => console.log('View Note information')} // eslint-disable-line no-console
          />
          <ButtonIcon
            className="text-red-500"
            Icon={TrashIcon}
            label="Delete Note"
            onClick={handleDeleteNote}
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
              className="block w-full h-full px-4 pt-1 pb-4 bg-transparent border-none outline-none resize-none overflow-auto"
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

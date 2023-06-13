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
import { useParams } from 'react-router-dom';
import { useRxData } from 'rxdb-hooks';

import { favouriteNote, updateNote } from '../api/notes';
import type { NoteDocType } from '../api/types';
import { ButtonIcon } from '../components/ButtonIcon';
import { Page } from '../components/Page';

export function Note() {
  const { id } = useParams();
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState('');
  const { result: [note] } = useRxData<NoteDocType>(
    'notes',
    (collection) => collection.findOne(id),
  );

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
            disabled
            Icon={TrashIcon}
            label="Delete Note"
            onClick={() => console.log('Delete Note')} // eslint-disable-line no-console
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
              className="w-full h-full px-4 pt-1 bg-transparent border-none outline-none resize-none overflow-auto"
            />
          </label>
        ) : (
          <Markdown
            className="w-full h-full px-4 pt-1 prose dark:prose-invert overflow-auto"
            options={{
              disableParsingRawHTML: true,
              forceWrapper: true,
              overrides: {
                a: {
                  // component: RendererLink,
                  props: {
                    className: 'text-link',
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

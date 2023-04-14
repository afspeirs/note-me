import { useEffect, useState } from 'react';
import {
  InformationCircleIcon,
  PencilIcon,
  PencilSquareIcon,
  StarIcon as StarOutlineIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import {
  StarIcon as StarSolidIcon,
} from '@heroicons/react/24/solid';
import Markdown from 'markdown-to-jsx';

import { ButtonIcon } from '../components/ButtonIcon';
import { Page } from '../components/Page';

export function Note() {
  const [edit, setEdit] = useState(false);
  const [favourite, setFavourite] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    if (!edit && text === '') {
      setEdit(true);
    }
  }, [edit, text]);

  return (
    <Page
      title="Note"
      icons={(
        <>
          <ButtonIcon
            Icon={edit ? PencilSquareIcon : PencilIcon}
            label={`${edit ? 'Save' : 'Edit'} Note`}
            onClick={() => setEdit((prevState) => !prevState)}
          />
          <ButtonIcon
            Icon={favourite ? StarSolidIcon : StarOutlineIcon}
            label={`${favourite ? 'Unfavourite' : 'Favourite'} Note`}
            onClick={() => setFavourite((prevState) => !prevState)}
          />
          <ButtonIcon
            Icon={InformationCircleIcon}
            label="View Note information"
            onClick={() => console.log('View Note information')} // eslint-disable-line no-console
          />
          <ButtonIcon
            className="text-red-500"
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
              className="w-full h-full px-4 pt-1 bg-white dark:bg-black dark:text-white border-none outline-none resize-none overflow-auto"
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

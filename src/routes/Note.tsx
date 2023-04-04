import {
  InformationCircleIcon,
  PencilIcon,
  StarIcon as StarOutlineIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

import { ButtonIcon } from '../components/ButtonIcon';
import { Page } from '../components/Page';

export function Note() {
  return (
    <Page
      title="Note"
      icons={(
        <>
          <ButtonIcon
            Icon={PencilIcon}
            label="Edit Note"
            onClick={() => console.log('Edit Note')} // eslint-disable-line no-console
          />
          <ButtonIcon
            Icon={StarOutlineIcon}
            label="Favourite Note"
            onClick={() => console.log('Favourite Note')} // eslint-disable-line no-console
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
      Note
    </Page>
  );
}

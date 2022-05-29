import {
  Star as StarIcon,
} from '@mui/icons-material';

import ToggleGlobalState from '@/components/shared/ToggleGlobalState';
import { useAuth } from '@/hooks/Auth';

function SortNotesFavourite() {
  const { isSignedIn } = useAuth();

  return (
    <ToggleGlobalState
      disabled={!isSignedIn}
      icon={StarIcon}
      label="Show Favourites first"
      state="settings-sortNotesFavourite"
    />
  );
}

export default SortNotesFavourite;

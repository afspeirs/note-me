import {
  Divider,
  List,
} from '@mui/material';
import {
  Add as AddIcon,
  Home as HomeIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

import NotesList from '@/components/NotesList';
import CheckForInstallPrompt from '@/components/shared/CheckForInstallPrompt';
import ListButton from '@/components/shared/ListButton';
import { useNotes } from '@/hooks/Notes';
import { useAuth } from '@/hooks/Auth';

function DrawerContent() {
  const { isSignedIn } = useAuth();
  const { createNote } = useNotes();

  return (
    <>
      <NotesList />

      <Divider />

      <List disablePadding>
        <CheckForInstallPrompt />

        <ListButton
          disabled={!isSignedIn}
          icon={AddIcon}
          onClick={() => createNote()}
          primary="Create Note"
        />

        <ListButton
          icon={HomeIcon}
          primary="Home"
          to="/"
        />

        <ListButton
          icon={SettingsIcon}
          primary="Settings"
          to="/settings/"
        />
      </List>
    </>
  );
}

export default DrawerContent;

import {
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Settings as SettingsIcon,
} from '@mui/icons-material';

function AppVersion() {
  return (
    <ListItem>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText
        primary="App version"
        secondary={import.meta.env.PACKAGE_VERSION}
      />
    </ListItem>
  );
}

export default AppVersion;

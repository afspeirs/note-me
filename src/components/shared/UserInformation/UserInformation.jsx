import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
} from '@mui/material';
import {
  ExitToApp as ExitToAppIcon,
} from '@mui/icons-material';
import { useConfirm } from 'material-ui-confirm';

import { useAuth } from '@/hooks/Auth';
import blankUserPhoto from './blank-user-photo.png';

function UserInformation() {
  const { signIn, signOut, user } = useAuth();
  const confirm = useConfirm();

  const handleSignOutClick = () => confirm({
    title: 'Are you sure you want to sign out?',
    cancellationText: 'Cancel',
    confirmationText: 'Sign Out',
  })
    .then(signOut);

  return (
    <>
      {user ? (
        <ListItem>
          <ListItemAvatar>
            <Avatar alt={user.displayName} src={user.photoURL} />
          </ListItemAvatar>
          <ListItemText
            primary={user.displayName}
            secondary={user.email.replace(/(?!^).(?=[^@]+@)/g, '*')}
          />
          <ListItemSecondaryAction>
            <Tooltip title="Sign Out" placement="left">
              <IconButton
                aria-label="sign out"
                color="inherit"
                edge="end"
                onClick={handleSignOutClick}
              >
                <ExitToAppIcon />
              </IconButton>
            </Tooltip>
          </ListItemSecondaryAction>
        </ListItem>
      ) : (
        <ListItem button onClick={signIn}>
          <ListItemAvatar>
            <Avatar src={blankUserPhoto} alt="" />
          </ListItemAvatar>
          <ListItemText primary="Sign In" secondary="Using your Google Account" />
        </ListItem>
      )}
    </>
  );
}

export default UserInformation;

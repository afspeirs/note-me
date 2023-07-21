import { useState } from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  InfoOutlined as InfoIcon,
} from '@mui/icons-material';

import NotesDepreciationNoticeModal from './NotesDepreciationNoticeModal';

function NotesDepreciationNotice() {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <>
      <ListItem
        button
        onClick={handleOpen}
      >
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="View Deprecation Notice" />
      </ListItem>

      <NotesDepreciationNoticeModal
        open={open}
        onClose={handleClose}
      />
    </>
  );
}

export default NotesDepreciationNotice;

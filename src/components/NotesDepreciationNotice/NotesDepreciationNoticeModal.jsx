import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@mui/material';
import {
  Close as CloseIcon,
} from '@mui/icons-material';

import styles from './NotesDepreciationNotice.styled';

const defaultProps = {
  open: false,
};

const propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

function NotesDepreciationNoticeModal({
  onClose,
  open,
}) {
  const handleConfirm = () => {
    window.localStorage.setItem('deprecation-notice-dismissed', 'true');
    onClose();
  };

  return (
    <Dialog
      aria-labelledby="export-dialog-title"
      onClose={onClose}
      open={open}
    >
      <AppBar position="relative">
        <Toolbar>
          <Typography sx={styles.title} variant="h6" component="div">
            Deprecation Notice
          </Typography>
          <IconButton
            aria-label="close"
            color="inherit"
            edge="end"
            onClick={onClose}
            size="large"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* eslint-disable max-len */}
      <DialogContent dividers>
        <Typography gutterBottom>
          A new and improved version of NoteMe will be launching later this year!
        </Typography>
        <Typography gutterBottom>
          The current version will be deprecated, but don&apos;t worry! You can still access all your notes at
          {' '}
          <a href="https://legacy.noteme.app" target="_blank" rel="noopener noreferrer">legacy.noteme.app</a>
          .
        </Typography>
        <Typography gutterBottom>
          To transition to the new version, please export your notes as markdown files from within this version of the app. This will enable you to import them into the new version when it&apos;s ready.
        </Typography>
        <Typography gutterBottom>
          The upcoming NoteMe version is being rewritten to work offline-first and offer optional note synchronisation across devices.
        </Typography>
        <Typography gutterBottom>
          Thank you for using NoteMe!
        </Typography>
      </DialogContent>
      {/* eslint-enable max-len */}

      <DialogActions>
        <Button
          autoFocus
          color="inherit"
          onClick={onClose}
        >
          Close
        </Button>
        <Button
          color="primary"
          onClick={handleConfirm}
        >
          Don&apos;t show again
        </Button>
      </DialogActions>
    </Dialog>
  );
}

NotesDepreciationNoticeModal.propTypes = propTypes;
NotesDepreciationNoticeModal.defaultProps = defaultProps;

export default NotesDepreciationNoticeModal;

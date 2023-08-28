import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import {
  Close as CloseIcon,
  CloudDownload as CloudDownloadIcon,
} from '@mui/icons-material';
import { useConfirm } from 'material-ui-confirm';

import { useAuth } from '@/hooks/Auth';
import { useNotes } from '@/hooks/Notes';
import { useSnackbar } from '@/hooks/Snackbar';
import { getTitle } from '@/utils';
import styles from './NotesExport.styled';

function NotesExport() {
  const { isSignedIn } = useAuth();
  const confirm = useConfirm();
  const { isLoading, notes } = useNotes();
  const snackbar = useSnackbar();
  const [checkedNotes, setCheckedNotes] = useState([]);
  const [open, setOpen] = useState(false);
  const isEveryNoteSelected = checkedNotes.every((note) => note === true);
  const isEveryNoteUnSelected = checkedNotes.every((note) => note === false);
  const selectedNotes = notes?.filter((note, index) => checkedNotes[index]) || [];

  const resetSelectedNotes = () => setCheckedNotes([...Array(notes?.length)].map(() => false));
  const toggleSelectedNotes = () => setCheckedNotes([...Array(notes?.length)]
    .map(() => !isEveryNoteSelected));

  const handleClose = () => {
    resetSelectedNotes();
    setOpen(false);
  };

  const handleOpen = () => setOpen(true);

  const handleSelectedNotesToggle = (index) => {
    const local = [...checkedNotes];
    const value = checkedNotes[index];

    local[index] = !value;
    setCheckedNotes(local);
  };

  const exportMarkdownFile = (exportedNotes) => {
    const zip = new JSZip();
    const currentDate = dayjs().format('YYYY-MM-DD-HHmm');

    exportedNotes.forEach((note) => {
      const fileName = getTitle(note.text)
        .replaceAll(/[^\w\s]/gi, ''); // Remove non-word characters (except spaces)

      const contents = `---
        ${Object.entries(note).filter(([key]) => !['text', 'title'].includes(key)).map(([key, value]) => `${key}: ${value}`).join('\n')}
      ---`
        .replace(/^\s+|\s+$/gm, '')
        .concat(`\n${note.text}`);

      zip.file(`${fileName}.md`, contents);
    });

    zip.generateAsync({ type: 'blob' })
      .then((blob) => saveAs(blob, `NoteMe_${currentDate}.zip`), (error) => console.error(error)); // eslint-disable-line no-console
  };

  const handleExportClick = () => {
    const notesToExport = isEveryNoteUnSelected ? notes : selectedNotes;
    // console.log(notesToExport);

    confirm({
      title: `Are you sure you want to export ${notesToExport.length === 1 ? 'this note' : `${notesToExport.length} notes`}?`,
      cancellationText: 'No',
      confirmationText: 'Yes',
    })
      .then(() => {
        handleClose();
        exportMarkdownFile(notesToExport);

        snackbar.showMessage({
          message: `${notesToExport.length} note${notesToExport.length === 1 ? ' has' : 's have'} been exported`,
        });
      })
      .catch((error) => {
        if (error) console.error(error); // eslint-disable-line no-console
      });
  };

  // Update / Reset checkedNotes if notes update
  useEffect(resetSelectedNotes, [notes]);

  if (!notes?.length) {
    return (
      <ListItem button disabled>
        <ListItemIcon>
          <CloudDownloadIcon />
        </ListItemIcon>
        <ListItemText primary="Export Notes" />
      </ListItem>
    );
  }
  return (
    <>
      <ListItem
        button
        disabled={!isSignedIn}
        onClick={handleOpen}
      >
        <ListItemIcon>
          <CloudDownloadIcon />
        </ListItemIcon>
        <ListItemText primary="Export Notes" />
      </ListItem>

      {!isLoading && (
      <Dialog
        aria-labelledby="export-dialog-title"
        onClose={handleClose}
        open={open}
      >
        <AppBar position="relative">
          <Toolbar>
            <Typography sx={styles.title} variant="h6" component="div">
              Export Notes
            </Typography>
            {handleClose ? (
              <IconButton
                aria-label="close"
                color="inherit"
                edge="end"
                onClick={handleClose}
                size="large"
              >
                <CloseIcon />
              </IconButton>
            ) : null}
          </Toolbar>
        </AppBar>

        <DialogContent dividers>
          <Typography gutterBottom>
            Select which notes you would like to export. They will be saved as a JSON file
          </Typography>
          <Typography>
            {`${selectedNotes.length} note(s) selected`}
          </Typography>

          <List dense>
            {checkedNotes.map((note, index) => {
              const currentNote = notes[index];
              const labelId = `checkbox-list-label-${currentNote?.id}`;

              return (
                <ListItem
                  key={currentNote?.id}
                  role={undefined}
                  dense
                  button
                  onClick={() => handleSelectedNotesToggle(index)}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      color="primary"
                      checked={checkedNotes[index]}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={labelId}
                    primary={currentNote?.title}
                    primaryTypographyProps={{
                      noWrap: true,
                    }}
                  />
                </ListItem>
              );
            })}
          </List>
        </DialogContent>

        <DialogActions>
          <Button
            color="inherit"
            onClick={toggleSelectedNotes}
          >
            Select All
          </Button>
          <Button
            autoFocus
            color="primary"
            onClick={handleExportClick}
          >
            {`Export ${isEveryNoteUnSelected ? 'All' : 'Selected'}`}
          </Button>
        </DialogActions>
      </Dialog>
      )}
    </>
  );
}

export default NotesExport;

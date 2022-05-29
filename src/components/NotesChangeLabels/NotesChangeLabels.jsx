import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  TextField,
  Checkbox,
  DialogContent,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Add as AddIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';

import { useNotes } from '@/hooks/Notes';
import styles from './NotesChangeLabels.styled';

const propTypes = {
  onClose: PropTypes.func.isRequired,
  note: PropTypes.shape({
    dateCreated: PropTypes.number,
    dateModified: PropTypes.number,
    favourite: PropTypes.bool,
    id: PropTypes.string,
    title: PropTypes.string,
    labels: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  open: PropTypes.bool.isRequired,
};

function NotesChangeLabels({
  note,
  onClose,
  open,
}) {
  const { labels, updateLabels } = useNotes();
  const [controlledLabels, setControlledLabels] = useState({});
  const [searchLabelsText, setSearchLabelsText] = useState('');

  const handleSearchLabelsTextChange = (event) => setSearchLabelsText(event.target.value);
  const doesLabelExist = !Object.keys(controlledLabels)
    .find((label) => label.toLowerCase() === searchLabelsText.toLowerCase());
  const filteredLabels = Object.keys(controlledLabels)
    .filter((label) => {
      if (searchLabelsText.length === 0) return label;
      return label.toLowerCase().search(searchLabelsText.toLowerCase()) !== -1;
    })
    .sort((a, b) => a.localeCompare(b)); // Probably overkill sorting the labels so much

  const handleAddLabel = (event) => {
    event.preventDefault();

    if (searchLabelsText.length !== 0) {
      setControlledLabels((prevState) => ({
        ...prevState,
        [searchLabelsText]: true,
      }));
      setSearchLabelsText('');
    }
  };

  const handleClose = () => {
    if (note) {
      const newLabels = Object.keys(controlledLabels)
        .filter((label) => controlledLabels[label] !== false)
        .sort((a, b) => a.localeCompare(b));

      if (JSON.stringify(note.labels) !== JSON.stringify(newLabels)) {
        updateLabels(newLabels, note);
      }
    }

    onClose();
  };

  const handleCheckboxChange = (label) => setControlledLabels((prevState) => ({
    ...prevState,
    [label]: !prevState[label],
  }));

  useEffect(() => {
    if (labels && note) {
      setControlledLabels(
        Object.assign({}, ...[...labels].map((label) => ({
          [label]: Boolean(note?.labels?.includes(label)),
        }))),
      );
    }
  }, [labels, note]);

  return (
    <Dialog
      aria-labelledby="change-labels-dialog"
      fullWidth
      maxWidth="xs"
      onClose={handleClose}
      open={open}
      sx={styles.dialog}
    >
      <DialogTitle id="change-labels-dialog">
        {`Add/Remove Labels from "${note.title}"`}
      </DialogTitle>

      <DialogContent dividers>
        <form
          autoComplete="off"
          noValidate
          onSubmit={handleAddLabel}
          style={styles.form}
        >
          <TextField
            fullWidth
            label="Search Labels"
            onChange={handleSearchLabelsTextChange}
            value={searchLabelsText}
            variant="outlined"
            InputProps={{
              endAdornment: searchLabelsText.length !== 0 && (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Clear Search"
                    edge="end"
                    color="inherit"
                    onClick={() => setSearchLabelsText('')}
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>

        <List>
          {Object.keys(controlledLabels).length === 0 && (
          <ListItem>
            <ListItemText primary="No labels found" />
          </ListItem>
          )}
          {filteredLabels.map((label) => {
            const labelId = `label-${label}`;

            return (
              <ListItem
                button
                dense
                key={labelId}
                onClick={() => handleCheckboxChange(label)}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={controlledLabels[label]}
                    color="primary"
                    disableRipple
                    edge="start"
                    inputProps={{ 'aria-labelledby': labelId }}
                    tabIndex={-1}
                  />
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  primary={label}
                />
              </ListItem>
            );
          })}
          {searchLabelsText.length !== 0 && doesLabelExist && (
          <ListItem
            button
            dense
            onClick={handleAddLabel}
          >
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary={`Add "${searchLabelsText}" as a new label`} />
          </ListItem>
          )}
        </List>
      </DialogContent>

      <DialogActions>
        <Button
          color="inherit"
          onClick={handleClose}
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}

NotesChangeLabels.propTypes = propTypes;

export default NotesChangeLabels;

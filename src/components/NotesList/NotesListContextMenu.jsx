import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  InfoOutlined as InfoIcon,
  Label as LabelIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
} from '@mui/icons-material';

import NotesChangeLabels from '@/components/NotesChangeLabels';
import NotesDisplayLabels from '@/components/NotesDisplayLabels';
import { useContextMenu } from '@/hooks/ContextMenu';
import { useNotes } from '@/hooks/Notes';
import { getDateCalendar, getDateRelative } from '@/utils';
import styles from './NotesList.styled';

const propTypes = {
  parentEl: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
  note: PropTypes.shape({
    dateCreated: PropTypes.number,
    dateModified: PropTypes.number,
    favourite: PropTypes.bool,
    id: PropTypes.string,
    labels: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
  }).isRequired,
};

function NotesListContextMenu({
  note,
  parentEl,
}) {
  const { contextMenu, contextMenuClose } = useContextMenu(parentEl);
  const {
    deleteNote,
    favouriteNote,
  } = useNotes();
  const [openChangeLabels, setOpenChangeLabels] = useState(false);

  const handleFavouriteNote = () => {
    contextMenuClose();
    favouriteNote(note);
  };

  const handleDeleteNote = () => {
    contextMenuClose();
    deleteNote(note);
  };

  const handleChangeLabels = () => {
    contextMenuClose();
    setOpenChangeLabels(true);
  };

  return (
    <>
      <Popover
        open={contextMenu?.id === note.id}
        onClose={contextMenuClose}
        anchorReference="anchorPosition"
        anchorPosition={contextMenu?.position}
      >
        <List dense sx={styles.contextMenuList}>
          {note.dateCreated && note.dateModified && (
          <ListItem>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText
              sx={styles.listItemTextDate}
              primary={`Last modified: ${getDateRelative(note.dateModified)}`}
              primaryTypographyProps={{
                noWrap: true,
              }}
              secondary={`Created: ${getDateCalendar(note.dateCreated)}`}
              secondaryTypographyProps={{
                noWrap: true,
              }}
            />
          </ListItem>
          )}
          <ListItem button onClick={handleFavouriteNote}>
            <ListItemIcon>
              {note.favourite ? <StarIcon color="primary" /> : <StarBorderIcon />}
            </ListItemIcon>
            <ListItemText
              primary={`${note.favourite ? 'Unfavourite' : 'Favourite'} "${note.title}"`}
              primaryTypographyProps={{
                noWrap: true,
              }}
            />
          </ListItem>
          <ListItem button onClick={handleDeleteNote}>
            <ListItemIcon>
              <DeleteIcon color="error" />
            </ListItemIcon>
            <ListItemText
              primary={`Delete "${note.title}"`}
              primaryTypographyProps={{
                noWrap: true,
              }}
            />
          </ListItem>
          <ListItem button onClick={handleChangeLabels}>
            <ListItemIcon>
              <LabelIcon />
            </ListItemIcon>
            <ListItemText
              primary={`Add/Remove Labels from "${note.title}"`}
              primaryTypographyProps={{
                noWrap: true,
              }}
            />
          </ListItem>
          <NotesDisplayLabels
            labels={note.labels}
            onClick={contextMenuClose}
          />
        </List>
      </Popover>

      <NotesChangeLabels
        note={note}
        onClose={() => setOpenChangeLabels(false)}
        open={openChangeLabels}
      />
    </>
  );
}

NotesListContextMenu.propTypes = propTypes;

export default NotesListContextMenu;

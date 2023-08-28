import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Alarm as AlarmIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
} from '@mui/icons-material';

import NotesDisplayLabels from '@/components/NotesDisplayLabels';
import { getDateCalendar, getDateRelative } from '@/utils';

const defaultProps = {
  note: {},
  open: false,
};

const propTypes = {
  note: PropTypes.shape({
    dateCreated: PropTypes.number,
    dateModified: PropTypes.number,
    favourite: PropTypes.bool,
    labels: PropTypes.arrayOf(PropTypes.string),
  }),
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

function NotesMoreInformation({
  note,
  onClose,
  open,
}) {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>More Information</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem>
          <ListItemIcon>
            <AlarmIcon />
          </ListItemIcon>
          <ListItemText
            primary={`Last modified: ${getDateRelative(note?.dateModified)}`}
            secondary={`Created: ${getDateCalendar(note?.dateCreated)}`}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            {note?.favourite ? <StarIcon color="inherit" /> : <StarBorderIcon />}
          </ListItemIcon>
          <ListItemText
            primary={`Favourite: ${note?.favourite ? 'Yes' : 'No'}`}
          />
        </ListItem>
        <NotesDisplayLabels
          labels={note.labels}
          onClick={onClose}
        />
      </List>
    </Dialog>
  );
}

NotesMoreInformation.defaultProps = defaultProps;
NotesMoreInformation.propTypes = propTypes;

export default NotesMoreInformation;
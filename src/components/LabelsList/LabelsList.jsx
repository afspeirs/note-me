import {
	ListItem,
	ListItemIcon,
	ListSubheader,
	ListItemText,
} from '@material-ui/core';
import {
	Label as LabelIcon,
} from '@material-ui/icons';

import useStyles from './LabelsList.styled';
import RouterNavLink from '../RouterNavLink';
import { useNotes } from '../../hooks/Notes';

const LabelsList = () => {
	const { labels, loading } = useNotes();
	const classes = useStyles();

	return (
		<>
			<ListSubheader>Labels</ListSubheader>
			{labels.length === 0 && loading === false && (
				<ListItem>
					<ListItemText primary="No labels found" />
				</ListItem>
			)}
			{labels.map((label) => (
				<ListItem
					key={`note-${label}`}
					button
					to={`/label/${label}`}
					component={RouterNavLink}
				>
					<ListItemIcon>
						<LabelIcon />
					</ListItemIcon>
					<ListItemText
						className={classes.listItemText}
						primary={label}
					/>
				</ListItem>
			))}
		</>
	);
};

export default LabelsList;

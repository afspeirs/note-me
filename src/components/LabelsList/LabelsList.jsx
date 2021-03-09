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
import RouterNavLink from '../shared/RouterNavLink';
import { useNotes } from '../../hooks/Notes';

const LabelsList = () => {
	const { labels, loading } = useNotes();
	const classes = useStyles();

	return (
		<>
			<ListSubheader className={classes.listSubheader}>
				Labels
			</ListSubheader>
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
					className={classes.listItem}
					component={RouterNavLink}
				>
					<ListItemIcon>
						<LabelIcon />
					</ListItemIcon>
					<ListItemText
						primary={label}
						primaryTypographyProps={{
							className: classes.listItemTypography,
						}}
					/>
				</ListItem>
			))}
		</>
	);
};

export default LabelsList;

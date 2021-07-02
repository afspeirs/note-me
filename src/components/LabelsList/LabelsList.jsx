import {
	ListItem,
	ListItemIcon,
	ListSubheader,
	ListItemText,
} from '@material-ui/core';
import {
	Label as LabelIcon,
} from '@material-ui/icons';

import RouterNavLink from '@/components/shared/RouterNavLink';
import { useNotes } from '@/hooks/Notes';
import useStyles from './LabelsList.styled';

const LabelsList = () => {
	const { labels, loading } = useNotes();
	const classes = useStyles();

	return (
		<>
			<ListSubheader className={classes.listSubheader}>
				Labels
			</ListSubheader>
			{labels.length === 0 && !loading && (
				<ListItem>
					<ListItemText primary="No labels found" />
				</ListItem>
			)}
			{labels.map((label) => (
				<ListItem
					key={`note-${label}`}
					button
					to={`/${label}`}
					className={classes.listItem}
					component={RouterNavLink}
				>
					<ListItemIcon>
						<LabelIcon />
					</ListItemIcon>
					<ListItemText
						primary={label}
						primaryTypographyProps={{
							noWrap: true,
						}}
					/>
				</ListItem>
			))}
		</>
	);
};

export default LabelsList;

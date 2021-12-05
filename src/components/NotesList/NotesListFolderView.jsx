import { useRef } from 'react';
import PropTypes from 'prop-types';
import {
	AppBar,
	Box,
	IconButton,
	List,
	Slide,
	Toolbar,
	Typography,
} from '@mui/material';
import {
	ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';

import styles from './NotesList.styled';
import NotesListItem from './NotesListItem';

const defaultProps = {
	notes: [],
	selectedFolder: null,
};

const propTypes = {
	notes: PropTypes.arrayOf(PropTypes.any),
	selectedFolder: PropTypes.shape({
		dateCreated: PropTypes.number,
		dateModified: PropTypes.number,
		favourite: PropTypes.bool,
		title: PropTypes.string,
	}),
	setSelectedFolder: PropTypes.func.isRequired,
};

const NotesListFolderView = ({
	notes,
	selectedFolder,
	setSelectedFolder,
}) => {
	const parentEl = useRef(null);

	return (
		<Slide direction="left" in={Boolean(selectedFolder)}>
			<Box sx={styles.folderView}>
				<AppBar position="relative">
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={styles.menuIcon}
							onClick={() => setSelectedFolder(null)}
						>
							<ArrowBackIcon />
						</IconButton>
						<Typography variant="h6" component="h3" noWrap>
							{selectedFolder?.title}
						</Typography>
					</Toolbar>
				</AppBar>

				<List ref={parentEl}>
					{notes?.map((note) => (
						<NotesListItem
							key={`note-${note.id}`}
							parentEl={parentEl}
							note={note}
							setSelectedFolder={setSelectedFolder}
						/>
					))}
				</List>
			</Box>
		</Slide>
	);
};

NotesListFolderView.defaultProps = defaultProps;
NotesListFolderView.propTypes = propTypes;

export default NotesListFolderView;

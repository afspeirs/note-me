import { useState, useEffect } from 'react';
import clsx from 'clsx';
import Markdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import {
	Fab,
	Tooltip,
} from '@material-ui/core';
import {
	Delete as DeleteIcon,
	Edit as EditIcon,
	Label as LabelIcon,
	Save as SaveIcon,
	Star as StarIcon,
	StarBorder as StarBorderIcon,
} from '@material-ui/icons';
import { useConfirm } from 'material-ui-confirm';

import useStyles from './NotePage.styled';
import LabelsAddDialog from '../../components/LabelsAddDialog';
import RendererLink from '../../components/RendererLink';
import Modal from '../../components/Modal';
import { useHotkeys } from '../../hooks/Hotkeys';
import { useNotes } from '../../hooks/Notes';

const NotePage = () => {
	const { id } = useParams();
	const confirm = useConfirm();
	const {
		notes,
		setCurrentNote,
		updateNote,
		favouriteNote,
		deleteNote,
	} = useNotes();
	const [localNote, setLocalNote] = useState();
	const [openAddLabel, setOpenAddLabel] = useState(null);
	const [edit, setEdit] = useState(false);
	const classes = useStyles();
	const currentNote = notes.find((note) => note.id === id);
	const headerItems = [
		{
			icon: currentNote?.favourite ? <StarIcon color="inherit" /> : <StarBorderIcon />,
			onClick: () => favouriteNote(currentNote),
			text: currentNote?.favourite ? 'Unfavourite' : 'Favourite',
		},
		{
			icon: <LabelIcon />,
			onClick: () => setOpenAddLabel(currentNote),
			text: `${currentNote?.labels?.length !== 0 ? 'Change' : 'Add'} Labels`,
		},
		{
			icon: <DeleteIcon />,
			onClick: () => {
				confirm({
					title: `Are you sure you want to delete "${currentNote.title}"?`,
					confirmationText: 'Delete',
				})
					.then(deleteNote);
			},
			text: 'Delete Note',
		},
	];

	useHotkeys({
		keys: ['e', 's'],
		callback: (event) => {
			event.preventDefault();
			setEdit((prevState) => !prevState);
		},
		metaModifier: true,
	});

	useEffect(() => {
		if (currentNote) {
			setCurrentNote(currentNote);
			setLocalNote(currentNote.text);
			setEdit(currentNote.text === '');
		}
		return () => setCurrentNote(null);
	}, [currentNote]); // eslint-disable-line

	useEffect(() => {
		const compare = localNote !== undefined && !edit;

		if (compare && id && localNote !== currentNote.text) {
			updateNote(localNote);
		}
	}, [edit]); // eslint-disable-line

	return (
		<>
			<Modal
				headerItems={headerItems}
				maxHeight
				maxWidth={false}
				showPrompt={localNote !== currentNote?.text}
				title={currentNote?.title}
			>
				{edit ? (
					<textarea
						className={clsx(classes.page, classes.textarea)}
						type="text"
						value={localNote}
						onChange={(event) => setLocalNote(event.target.value)}
					/>
				) : (
					<Markdown
						className={clsx(classes.page, classes.markdown)}
						escapeHtml
						renderers={{ link: RendererLink }}
						source={localNote}
					/>
				)}

				<Tooltip title={edit ? 'Save' : 'Edit'}>
					<Fab
						color="primary"
						aria-label={edit ? 'Save' : 'Edit'}
						className={classes.fab}
						onClick={() => setEdit((prevState) => !prevState)}
					>
						{edit ? <SaveIcon /> : <EditIcon />}
					</Fab>
				</Tooltip>
			</Modal>

			<LabelsAddDialog note={openAddLabel} setOpen={setOpenAddLabel} />
		</>
	);
};

export default NotePage;

import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Prompt, useParams } from 'react-router-dom';
import Markdown from 'react-markdown';
import {
	Fab,
	Tooltip,
} from '@material-ui/core';
import {
	Delete as DeleteIcon,
	Edit as EditIcon,
	Save as SaveIcon,
	Star as StarIcon,
	StarBorder as StarBorderIcon,
} from '@material-ui/icons';
import { useConfirm } from 'material-ui-confirm';

import useStyles from './NotePage.styled';
import LinkRenderer from '../../components/LinkRenderer';
import Modal from '../../components/Modal';
import { useNotes } from '../../hooks/Notes';
import { useGlobalState } from '../../hooks/GlobalState';

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
	const [localNote, setLocalNote] = useState(undefined);
	const [{ edit }, dispatch] = useGlobalState();
	const classes = useStyles();
	const currentNote = notes.find((note) => note.id === id);

	const handleDeleteNote = () => {
		confirm({
			title: `Are you sure you want to delete "${currentNote.title}"?`,
			confirmationText: 'Delete',
		})
			.then(deleteNote);
	};

	const handleFavouriteNote = () => favouriteNote();

	useEffect(() => {
		if (currentNote) {
			setCurrentNote(currentNote);
			setLocalNote(currentNote.text);
			dispatch({
				type: 'app-edit',
				value: currentNote.text === '',
			});
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
		<Modal
			title={currentNote?.title}
			maxHeight
			maxWidth="lg"
			headerItems={[
				{
					icon: currentNote?.favourite ? <StarIcon color="inherit" /> : <StarBorderIcon />,
					onClick: handleFavouriteNote,
					text: currentNote?.favourite ? 'Unfavourite' : 'Favourite',
				},
				{
					icon: <DeleteIcon />,
					onClick: handleDeleteNote,
					text: 'Delete Note',
				},
			]}
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
					className={classes.page}
					escapeHtml
					renderers={{ link: LinkRenderer }}
					source={localNote}
				/>
			)}

			{currentNote && (
				<Prompt
					when={localNote !== currentNote.text}
					message="Are you sure you want to leave without saving?"
				/>
			)}

			<Tooltip title={edit ? 'Save' : 'Edit'}>
				<Fab
					color="primary"
					aria-label={edit ? 'Save' : 'Edit'}
					className={classes.fab}
					onClick={() => dispatch({ type: 'app-edit' })}
				>
					{edit ? <SaveIcon /> : <EditIcon />}
				</Fab>
			</Tooltip>
		</Modal>
	);
};

export default NotePage;

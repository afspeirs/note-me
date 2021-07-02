import { useState, useEffect } from 'react';
import clsx from 'clsx';
import Markdown from 'markdown-to-jsx';
import { useParams } from 'react-router-dom';
import {
	Delete as DeleteIcon,
	Edit as EditIcon,
	Label as LabelIcon,
	Save as SaveIcon,
	Star as StarIcon,
	StarBorder as StarBorderIcon,
} from '@material-ui/icons';

import LabelsAddDialog from '@/components/LabelsAddDialog';
import Modal from '@/components/shared/Modal';
import RendererLink from '@/components/shared/RendererLink';
import { useHotkeys } from '@/hooks/Hotkeys';
import { useNotes } from '@/hooks/Notes';
import useStyles from './Note.styled';

const Note = () => {
	const classes = useStyles();
	const { id } = useParams();
	const {
		deleteNote,
		favouriteNote,
		notes,
		updateNote,
	} = useNotes();
	const [edit, setEdit] = useState(false);
	const [localNote, setLocalNote] = useState();
	const [openAddLabel, setOpenAddLabel] = useState(false);
	const currentNote = notes?.find((note) => note.id === id);

	const headerItems = [
		{
			icon: edit ? <SaveIcon /> : <EditIcon />,
			onClick: () => setEdit((prevState) => !prevState),
			text: edit ? 'Save' : 'Edit',
		},
		{
			icon: currentNote?.favourite ? <StarIcon color="inherit" /> : <StarBorderIcon />,
			onClick: () => favouriteNote(currentNote),
			text: currentNote?.favourite ? 'Unfavourite' : 'Favourite',
		},
		{
			icon: <LabelIcon />,
			onClick: () => setOpenAddLabel(true),
			text: `${currentNote?.labels?.length !== 0 ? 'Change' : 'Add'} Labels`,
		},
		{
			icon: <DeleteIcon />,
			onClick: () => deleteNote(currentNote),
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
			setLocalNote(currentNote.text);
			setEdit(currentNote.text === '');
		}
	}, [currentNote]); // eslint-disable-line

	useEffect(() => {
		const compare = !edit && id && localNote !== undefined && localNote !== currentNote.text;

		if (compare) {
			updateNote(id, localNote);
		}
	}, [edit]); // eslint-disable-line

	if (!currentNote?.id) return null;
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
						overrides={{
							a: RendererLink,
						}}
					>
						{localNote}
					</Markdown>
				)}
			</Modal>

			<LabelsAddDialog note={openAddLabel ? currentNote : undefined} setOpen={setOpenAddLabel} />
		</>
	);
};

export default Note;

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
	Delete as DeleteIcon,
	Edit as EditIcon,
	InfoOutlined as InfoIcon,
	Save as SaveIcon,
	Star as StarIcon,
	StarBorder as StarBorderIcon,
} from '@mui/icons-material';

import Page from '@/components/shared/Page';
import RendererLink from '@/components/shared/RendererLink';
import { useHotkeys } from '@/hooks/Hotkeys';
import { useNotes } from '@/hooks/Notes';
import { MarkdownStyled, TextareaStyled } from './Note.styled';

const Note = () => {
	const { id } = useParams();
	const {
		deleteNote,
		favouriteNote,
		notes,
		updateNote,
	} = useNotes();
	const [edit, setEdit] = useState(false);
	const [localNote, setLocalNote] = useState(null);
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
			// TODO: Add info button that opens a popup of the info in the context menu from NotesList
			disabled: true,
			icon: <InfoIcon />,
			// onClick: () => {},
			text: 'More Information',
		},
		{
			icon: <DeleteIcon />,
			onClick: () => deleteNote(currentNote),
			text: 'Delete Note',
		},
	];

	// CTRL + E || CTRL + S = Save / Edit Note
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
	}, [currentNote]);

	useEffect(() => {
		const compare = !edit && id && localNote && localNote !== currentNote?.text;

		if (compare) {
			updateNote(id, localNote);
		}
	}, [edit]);

	if (!currentNote?.id) return null;
	return (
		<Page
			headerItems={headerItems}
			showPrompt={localNote !== currentNote?.text}
			title={currentNote?.title}
		>
			{edit ? (
				<TextareaStyled
					value={localNote || ''}
					onChange={(event) => setLocalNote(event.target.value)}
				/>
			) : (
				<MarkdownStyled
					overrides={{
						a: RendererLink,
					}}
				>
					{localNote || ''}
				</MarkdownStyled>
			)}
		</Page>
	);
};

export default Note;

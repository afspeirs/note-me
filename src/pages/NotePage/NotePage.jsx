import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Prompt, useParams } from 'react-router-dom';
import Markdown from 'react-markdown';
import {
	AppBar,
	Fab,
	Toolbar,
	Tooltip,
} from '@material-ui/core';
import {
	CheckBox as CheckBoxIcon,
	Code as CodeIcon,
	Edit as EditIcon,
	FormatBold as FormatBoldIcon,
	FormatItalic as FormatItalicIcon,
	FormatListBulleted as FormatListBulletedIcon,
	FormatListNumbered as FormatListNumberedIcon,
	FormatQuote as FormatQuoteIcon,
	FormatUnderlined as FormatUnderlinedIcon,
	Save as SaveIcon,
	StrikethroughS as StrikethroughSIcon,
	TextFields as TextFieldsIcon,
	Title as TitleIcon,
} from '@material-ui/icons';
import {
	ToggleButton,
	ToggleButtonGroup,
} from '@material-ui/lab';

import useStyles from './NotePage.styled';
import LinkRenderer from '../../components/LinkRenderer';
import { useNotes } from '../../hooks/NotesContext';
import { useStateValue } from '../../hooks/StateContext';

const NotePage = () => {
	const { id } = useParams();
	const { notes, setCurrentNote, updateNote } = useNotes();
	const [localNote, setLocalNote] = useState(undefined);
	const [selection, setSelection] = useState(null);
	const [{ edit }, dispatch] = useStateValue();
	const classes = useStyles();
	const currentNote = notes.find((note) => note.id === id);
	const [formats, setFormats] = useState(() => []);
	const [recentFormat, setRecentFormat] = useState(null);

	const handleFormat = (event, newFormats) => {
		setRecentFormat(event.target.value);
		setFormats(newFormats);
	};

	const splitAt = (index) => [localNote.slice(0, index), localNote.slice(index)];

	const formatSelection = (format) => {
		let array = [];

		if (selection?.end !== selection?.start) {
			// Insert the format around the cursor selection
			const string = localNote.substring(selection.start, selection.end);
			array = localNote.split(string);
			// console.log(string);
			array.splice(1, 0, format);
			array.splice(2, 0, string);
			array.splice(3, 0, format);
		} else {
			// Insert the format at the cursor position
			array = splitAt(selection.start);
			array.splice(1, 0, format);
			array.splice(2, 0, format);
		}

		return array.join('');
	};

	const prefixLine = (prefix) => {
		const lines = localNote.substring(0, selection?.start).split('\n');
		const lastLine = lines[lines.length - 1];

		// TODO: check if the prefix as at the start of the line
		// If it is remove it
		// If it isnt add it

		lines[lines.length - 1] = `${prefix} ${lastLine}`;
		// console.log(lines);

		return [...lines, ...localNote.substring(selection?.start).split('\n')];
	};

	const updateSelection = (target) => {
		const { selectionEnd, selectionStart } = target;

		setSelection({
			end: selectionEnd,
			start: selectionStart,
		});
	};

	// TODO: force blur when saving a not via shortcuts
	const handleBlur = (event) => {
		if (edit) {
			// console.log('don't blur');
			event.target.focus();
		} else {
			// console.log('blur');
			setSelection(null);
		}
	};

	const handleChange = (event) => {
		updateSelection(event.target);
		setLocalNote(event.target.value);
	};

	// const handleFocus = () => {
	// 	console.log('focus');
	// };

	const handleSelect = (event) => {
		updateSelection(event.target);
	};

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
		if (!edit) {
			setSelection(null);
		}
	}, [edit]); // eslint-disable-line

	// Update formats on selection of text
	useEffect(() => {
		console.log(selection);

		// Reset Formats
		// setFormats([]);
		setRecentFormat(null);

		// Check if the text is one/many of the following
		// bold
		// italic
		// underlined
		// title
		// subtitle
		// strikethrough
		// bulletlist
		// numberlist
		// checklist
		// blockquote
		// code
	}, [selection]); // eslint-disable-line

	useEffect(() => {
		console.log(formats);
		// console.log(recentFormat);

		if (recentFormat === 'bold') {
			console.dir(formats);

			setLocalNote(formatSelection('**'));
			// TODO: move the cursor 2 charactors from the initial point
		}

		// if (selection?.end !== selection?.start) {
		// 	console.log(formatSelection('__'));
		// }
		// if (localNote && selection && selection?.end === selection?.start) {
		// 	console.log(prefixLine('-'));
		// }

		// Check if the text is one/many of the following
		// bold
		// italic
		// underlined
		// title
		// subtitle
		// strikethrough
		// bulletlist
		// numberlist
		// checklist
		// blockquote
		// code
	}, [formats]); // eslint-disable-line

	return (
		<>
			{edit ? (
				<>
					<textarea
						className={clsx(classes.page, classes.textarea)}
						type="text"
						value={localNote}
						onBlur={handleBlur}
						onChange={handleChange}
						// onFocus={handleFocus}
						onSelect={handleSelect}
					/>

					<AppBar className={classes.appBar} color="inherit" position="sticky">
						<Toolbar className={classes.toolbar} disableGutters variant="dense">
							<ToggleButtonGroup aria-label="note formatting" onChange={handleFormat} value={formats}>
								<ToggleButton value="bold" aria-label="bold" disabled={!selection}>
									<FormatBoldIcon />
								</ToggleButton>
								<ToggleButton value="italic" aria-label="italic" disabled={!selection}>
									<FormatItalicIcon />
								</ToggleButton>
								<ToggleButton value="underlined" aria-label="underlined" disabled={!selection}>
									<FormatUnderlinedIcon />
								</ToggleButton>
								<ToggleButton value="title" aria-label="title" disabled={!selection}>
									<TitleIcon />
								</ToggleButton>
								<ToggleButton value="subtitle" aria-label="subtitle" disabled={!selection}>
									<TextFieldsIcon />
								</ToggleButton>
								<ToggleButton value="strikethrough" aria-label="strikethrough" disabled={!selection}>
									<StrikethroughSIcon />
								</ToggleButton>
								<ToggleButton value="bulletlist" aria-label="bulletlist" disabled={!selection}>
									<FormatListBulletedIcon />
								</ToggleButton>
								<ToggleButton value="numberlist" aria-label="numberlist" disabled={!selection}>
									<FormatListNumberedIcon />
								</ToggleButton>
								<ToggleButton value="checklist" aria-label="checklist" disabled={!selection}>
									<CheckBoxIcon />
								</ToggleButton>
								<ToggleButton value="blockquote" aria-label="blockquote" disabled={!selection}>
									<FormatQuoteIcon />
								</ToggleButton>
								<ToggleButton value="code" aria-label="code" disabled={!selection}>
									<CodeIcon />
								</ToggleButton>
								{/* URL */}
								{/* Photo URL */}
								<div className={classes.spacer} />
							</ToggleButtonGroup>
						</Toolbar>
					</AppBar>
				</>
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
		</>
	);
};

export default NotePage;

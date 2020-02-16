import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Prompt } from 'react-router-dom';
import Markdown from 'react-markdown';
import {
	Fab,
	Tooltip,
} from '@material-ui/core';
import {
	Edit as EditIcon,
	Save as SaveIcon,
} from '@material-ui/icons';

import useStyles from './NotePage.styled';
import LinkRenderer from '../../components/LinkRenderer';
import { useStateValue } from '../../hooks/StateContext';

const defaultProps = {
	note: null,
};

const propTypes = {
	handleNoteUpdate: PropTypes.func.isRequired,
	match: PropTypes.instanceOf(Object).isRequired,
	note: PropTypes.instanceOf(Object),
};

const NotePage = ({
	handleNoteUpdate,
	match,
	note,
}) => {
	const classes = useStyles();
	const [localNote, setLocalNote] = useState(undefined);
	const [{ edit }, dispatch] = useStateValue();
	const { id } = match.params;

	useEffect(() => {
		if (note !== null) {
			setLocalNote(note.text);
			dispatch({
				type: 'app-edit',
				value: note.text === '',
			});
		}
	}, [note]); // eslint-disable-line

	useEffect(() => {
		const compare = localNote !== undefined && !edit;

		if (compare && id && localNote !== note.text) {
			handleNoteUpdate(id, localNote);
		}
	}, [edit]); // eslint-disable-line

	return (
		<>
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

			{note && (
				<Prompt
					when={localNote !== note.text}
					message="Are you sure you want to leave without saving?"
				/>
			)}

			<Tooltip title={edit ? 'Save' : 'Edit'}>
				<Fab
					color="primary"
					aria-label={edit ? 'Save' : 'Edit'}
					className={classes.fab}
					onClick={() => dispatch({
						type: 'app-edit',
						value: !edit,
					})}
				>
					{edit ? <SaveIcon /> : <EditIcon />}
				</Fab>
			</Tooltip>
		</>
	);
};

NotePage.defaultProps = defaultProps;
NotePage.propTypes = propTypes;

export default NotePage;

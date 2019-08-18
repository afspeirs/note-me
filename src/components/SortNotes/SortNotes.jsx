import React from 'react';
import PropTypes from 'prop-types';
import {
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
} from '@material-ui/core';

import { useStateValue } from '../StateContext';

const propTypes = {

};

const SortNotes = () => {
	const [{ sort }, dispatch] = useStateValue();

	console.log(sort);

	return (
		<ListItem>
			<ListItemText primary="Sort Notes by:" />
			<ListItemSecondaryAction>
				{sort}
			</ListItemSecondaryAction>
		</ListItem>
	);
};

SortNotes.propTypes = propTypes;

export default SortNotes;

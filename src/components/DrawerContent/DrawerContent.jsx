import React from 'react';
import PropTypes from 'prop-types';
// import {
// 	Divider,
// 	List,
// 	ListItem,
// 	ListItemText,
// 	Typography,
// } from '@material-ui/core';

import NotesList from '../NotesList';
// import { ListStyled } from './DrawerContent.styled';
// import ContextMenu from '../ContextMenu';

const propTypes = {
	loading: PropTypes.bool.isRequired,
	notes: PropTypes.instanceOf(Array).isRequired,
};

const DrawerContent = ({
	loading,
	notes,
}) => {
	// const locationClick = (index) => {
	// 	updateActiveLocation(index);
	// 	if (!matches) handleDrawerToggle();
	// };

	return (
		<>
			<NotesList
				loading={loading}
				notes={notes}
			/>
		</>
	);
};

DrawerContent.propTypes = propTypes;

export default DrawerContent;

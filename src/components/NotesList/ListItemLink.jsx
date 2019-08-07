import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { ListItem } from '@material-ui/core';

import { ListItemTextStyled } from './NotesList.styled';

const propTypes = {
	primary: PropTypes.string.isRequired,
	to: PropTypes.string.isRequired,
};

const ListItemLink = ({ primary, to }) => {
	const renderLink = React.useMemo(
		() => React.forwardRef((itemProps, ref) => (
			<RouterLink to={to} {...itemProps} ref={ref} />
		)),
		[to],
	);

	return (
		<li>
			<ListItem button component={renderLink}>
				<ListItemTextStyled primary={primary} />
			</ListItem>
		</li>
	);
};

ListItemLink.propTypes = propTypes;

export default ListItemLink;

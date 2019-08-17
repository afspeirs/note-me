import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import {
	Edit as EditIcon,
	Home as HomeIcon,
	Save as SaveIcon,
} from '@material-ui/icons';

import Settings from '../Settings';

const defaultProps = {
	user: null,
	fullScreen: false,
};

const propTypes = {
	edit: PropTypes.bool.isRequired,
	fullScreen: PropTypes.bool,
	setEdit: PropTypes.func.isRequired,
	signIn: PropTypes.func.isRequired,
	signOut: PropTypes.func.isRequired,
	user: PropTypes.instanceOf(Object),
};

const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

const HeaderIcons = ({
	edit,
	fullScreen,
	setEdit,
	signIn,
	signOut,
	user,
}) => (
	<>
		<Route
			path="/note"
			render={() => (
				<>
					<IconButton
						color="inherit"
						aria-label={edit ? 'Save' : 'Edit'}
						onClick={() => setEdit(!edit)}
					>
						{edit ? <SaveIcon /> : <EditIcon />}
					</IconButton>
					<IconButton
						component={AdapterLink}
						to="/"
						color="inherit"
						aria-label="Home"
					>
						<HomeIcon />
					</IconButton>
				</>
			)}
		/>
		<Settings
			fullScreen={fullScreen}
			signIn={signIn}
			signOut={signOut}
			user={user}
		/>
	</>
);

HeaderIcons.defaultProps = defaultProps;
HeaderIcons.propTypes = propTypes;

export default HeaderIcons;

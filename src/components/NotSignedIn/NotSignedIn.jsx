import React from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	List,
	ListItem,
	ListItemText,
} from '@material-ui/core';

import useStyles from './NotSignedIn.styled';

const propTypes = {
	signIn: PropTypes.func.isRequired,
};

const NotSignedIn = ({ signIn }) => {
	const classes = useStyles();

	return (
		<>
			<List className={classes.list}>
				<ListItem>
					<ListItemText primary="Please sign in below with a Google account to use this app" />
				</ListItem>
				<ListItem>
					<Button variant="contained" color="primary" onClick={signIn}>Sign In</Button>
				</ListItem>
			</List>

		</>
	);
};

NotSignedIn.propTypes = propTypes;

export default NotSignedIn;

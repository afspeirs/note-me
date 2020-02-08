import React from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	IconButton,
	Snackbar,
} from '@material-ui/core';
import {
	Close as CloseIcon,
} from '@material-ui/icons';

import useStyles from './SimpleSnackbar.styled';

const defaultProps = {
	onSecondaryClose: () => {},
	secondaryText: null,
	text: null,
};

const propTypes = {
	onClose: PropTypes.func.isRequired,
	onSecondaryClose: PropTypes.func,
	secondaryText: PropTypes.string,
	text: PropTypes.string,
};

const SimpleSnackbar = ({
	onClose,
	onSecondaryClose,
	secondaryText,
	text,
}) => {
	const classes = useStyles();
	const open = Boolean(text);

	const handleSecondaryClick = () => {
		onSecondaryClose();
		onClose();
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') return;
		onClose();
	};

	return (
		<Snackbar
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
			open={open}
			autoHideDuration={6000}
			onClose={handleClose}
			ContentProps={{ 'aria-describedby': 'message-id' }}
			message={<span id="message-id">{text}</span>}
			action={[
				secondaryText && (
					<Button
						key="update"
						color="primary"
						size="small"
						onClick={handleSecondaryClick}
					>
						{/* eslint-disable-line react/jsx-one-expression-per-line */}
						{secondaryText}
					</Button>
				),
				<IconButton
					key="close"
					aria-label="close"
					color="inherit"
					className={classes.close}
					onClick={handleClose}
				>
					<CloseIcon />
				</IconButton>,
			]}
		/>
	);
};

SimpleSnackbar.defaultProps = defaultProps;
SimpleSnackbar.propTypes = propTypes;

export default SimpleSnackbar;

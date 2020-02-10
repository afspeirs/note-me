import React from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	Snackbar,
} from '@material-ui/core';

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
						{secondaryText}
					</Button>
				),
			]}
		/>
	);
};

SimpleSnackbar.defaultProps = defaultProps;
SimpleSnackbar.propTypes = propTypes;

export default SimpleSnackbar;

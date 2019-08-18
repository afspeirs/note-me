import React from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
} from '@material-ui/core';

import { getTitle } from '../../ultils';

const defaultProps = {
	value: null,
};

const propTypes = {
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	value: PropTypes.instanceOf(Object),
};

const DeleteConfirmationDialog = ({
	onClose,
	value,
	open,
}) => {
	const handleConfirm = (note = null) => onClose(note);

	return value && (
		<Dialog
			maxWidth="xs"
			aria-labelledby="confirmation-dialog-title"
			open={open}
			onClose={onClose}
		>
			<DialogTitle id="confirmation-dialog-title">{`Are you sure you want to delete "${value && getTitle(value.text)}"?`}</DialogTitle>
			<DialogActions>
				<Button onClick={onClose} color="primary" autoFocus>Cancel</Button>
				<Button onClick={() => handleConfirm(value)} color="secondary">Delete</Button>
			</DialogActions>
		</Dialog>
	);
};

DeleteConfirmationDialog.defaultProps = defaultProps;
DeleteConfirmationDialog.propTypes = propTypes;

export default DeleteConfirmationDialog;

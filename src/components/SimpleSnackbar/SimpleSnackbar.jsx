import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
	Button,
	IconButton,
	Snackbar,
} from '@material-ui/core';
import {
	Close as CloseIcon,
} from '@material-ui/icons';

const defaultProps = {
	onClose: () => {},
	secondaryText: null,
};

const propTypes = {
	onClose: PropTypes.func,
	secondaryText: PropTypes.string,
	text: PropTypes.string.isRequired,
};

const useStyles = makeStyles(theme => ({
	close: {
		padding: theme.spacing(0.5),
	},
}));

const SimpleSnackbar = ({
	onClose,
	secondaryText,
	text,
}) => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(Boolean(text));

	const handleSecondaryClick = () => {
		onClose();
		setOpen(false);
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
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

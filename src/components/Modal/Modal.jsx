import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
	AppBar,
	Dialog,
	IconButton,
	Slide,
	Toolbar,
	Typography,
	useMediaQuery,
} from '@material-ui/core';
import {
	ArrowBack as ArrowBackIcon,
	Close as CloseIcon,
} from '@material-ui/icons';

import useStyles from './Modal.styled';

// eslint-disable-next-line react/jsx-props-no-spreading
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const defaultProps = {
	fullscreen: false,
	title: 'Modal',
};

const propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
	fullscreen: PropTypes.bool,
	title: PropTypes.string,
};

const Modal = ({
	children,
	fullscreen,
	title,
}) => {
	const classes = useStyles();
	const history = useHistory();
	const [open, setOpen] = React.useState(true);
	const mobile = useMediaQuery('(max-width:600px)');
	const fullScreenModal = fullscreen || mobile;

	const handleClose = (event) => {
		event.stopPropagation();
		setOpen(false);
		setTimeout(() => history.goBack(), 250);
	};

	return (
		<Dialog
			className={classes.dialog}
			fullWidth
			fullScreen={fullScreenModal}
			open={open}
			onClose={handleClose}
			TransitionComponent={Transition}
		>
			<AppBar className={classes.appbar}>
				<Toolbar>
					{fullScreenModal && (
						<IconButton
							className={classes.menuButton}
							aria-label="close"
							color="inherit"
							edge="start"
							onClick={handleClose}
						>
							<ArrowBackIcon />
						</IconButton>
					)}
					<Typography className={classes.title} variant="h6">{title}</Typography>
					{!fullScreenModal && (
						<IconButton
							aria-label="close"
							color="inherit"
							edge="end"
							onClick={handleClose}
						>
							<CloseIcon />
						</IconButton>
					)}
				</Toolbar>
			</AppBar>
			<div className={classes.children}>
				{children}
			</div>
		</Dialog>
	);
};

Modal.defaultProps = defaultProps;
Modal.propTypes = propTypes;

export default Modal;

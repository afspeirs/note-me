import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
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
import HeaderContent from '../HeaderContent';

// eslint-disable-next-line react/jsx-props-no-spreading
const Transition = forwardRef((props, ref) => <Slide ref={ref} {...props} />);

const defaultProps = {
	fullscreen: false,
	title: 'Modal',
	maxHeight: false,
	maxWidth: 'sm',
	headerItems: [],
};

const propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
	fullscreen: PropTypes.bool,
	headerItems: PropTypes.arrayOf(
		PropTypes.shape({
			icon: PropTypes.node,
			onClick: PropTypes.func,
			text: PropTypes.string,
		}),
	),
	maxHeight: PropTypes.bool,
	maxWidth: PropTypes.string,
	title: PropTypes.string,
};

const Modal = ({
	children,
	fullscreen,
	headerItems,
	maxHeight,
	maxWidth,
	title,
}) => {
	const classes = useStyles({ maxHeight });
	const history = useHistory();
	const [open, setOpen] = useState(true);
	const { breakpoints } = useTheme();
	const mobile = !useMediaQuery(breakpoints.up(maxWidth)); // Matches below the breakpoint
	const fullScreenModal = fullscreen || mobile;

	const handleClose = (event) => {
		event.stopPropagation();
		setOpen(false);
		setTimeout(() => history.goBack(), 250);
	};

	return (
		<Dialog
			fullWidth
			maxWidth={maxWidth}
			fullScreen={fullScreenModal}
			open={open}
			onClose={handleClose}
			TransitionComponent={Transition}
			TransitionProps={{
				direction: mobile ? 'left' : 'up',
			}}
			aria-labelledby={`${title}-modal-title`}
			PaperProps={{
				className: classes.root,
			}}
		>
			<AppBar className={classes.appBar}>
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
					<Typography
						className={classes.title}
						variant="h6"
						id={`${title}-modal-title`}
					>
						{title}
					</Typography>
					<HeaderContent headerItems={headerItems} />
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

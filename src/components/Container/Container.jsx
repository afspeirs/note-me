import React from 'react';
import PropTypes from 'prop-types';
import {
	AppBar,
	Toolbar,
	useMediaQuery,
} from '@material-ui/core';
import {
	Menu as MenuIcon,
} from '@material-ui/icons';

import {
	ContainerStyled,
	Content,
	DrawerHeader,
	DrawerPlaceholder,
	DrawerStyled,
	MenuButtonStyled,
	Title,
} from './Container.styled';
import DrawerContent from '../DrawerContent';
import HeaderContent from '../HeaderContent';
import { useStateValue } from '../StateContext';

const propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
	edit: PropTypes.bool.isRequired,
	handleNoteDelete: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	notes: PropTypes.instanceOf(Array).isRequired,
	setEdit: PropTypes.func.isRequired,
};

const Container = ({
	children,
	edit,
	handleNoteDelete,
	loading,
	notes,
	setEdit,
}) => {
	const [open, setOpen] = React.useState(false);
	const mobile = useMediaQuery('(max-width:600px)');
	const [{ performance }] = useStateValue();

	const handleDrawerToggle = (toggle = false) => {
		if ((toggle === true) || mobile) setOpen(!open);
	};

	return (
		<ContainerStyled>
			<AppBar position="fixed">
				<Toolbar>
					<MenuButtonStyled
						color="inherit"
						aria-label="Open drawer"
						edge="start"
						onClick={() => handleDrawerToggle(true)}
					>
						<MenuIcon />
					</MenuButtonStyled>
					<Title variant="h6">NoteMe</Title>
					<HeaderContent
						edit={edit}
						fullScreen={mobile}
						setEdit={setEdit}
					/>
				</Toolbar>
			</AppBar>
			<DrawerPlaceholder smUp implementation="css" />
			<DrawerStyled
				variant={mobile ? 'temporary' : 'persistent'}
				anchor="left"
				open={open}
				onOpen={handleDrawerToggle}
				onClose={handleDrawerToggle}
				ModalProps={{ keepMounted: true }}
				disableBackdropTransition={performance}
			>
				<DrawerHeader />
				<DrawerContent
					handleDrawerToggle={handleDrawerToggle}
					handleNoteDelete={handleNoteDelete}
					loading={loading}
					notes={notes}
				/>
			</DrawerStyled>
			<Content open={open}>
				<DrawerHeader />
				{children}
			</Content>
		</ContainerStyled>
	);
};

Container.propTypes = propTypes;

export default Container;

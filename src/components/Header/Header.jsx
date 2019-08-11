import React from 'react';
import PropTypes from 'prop-types';
import {
	AppBar,
	IconButton,
	Toolbar,
	useMediaQuery,
} from '@material-ui/core';
import {
	Edit as EditIcon,
	Menu as MenuIcon,
	Save as SaveIcon,
} from '@material-ui/icons';

import {
	Container,
	Content,
	DrawerHeader,
	DrawerPlaceholder,
	DrawerStyled,
	MenuButtonStyled,
	Title,
} from './Header.styled';
import Settings from '../Settings';
import DrawerContent from '../DrawerContent';

const defaultProps = {
	user: null,
};

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
	signIn: PropTypes.func.isRequired,
	signOut: PropTypes.func.isRequired,
	user: PropTypes.instanceOf(Object),
};

const Header = ({
	children,
	edit,
	handleNoteDelete,
	loading,
	notes,
	setEdit,
	signIn,
	signOut,
	user,
}) => {
	const [open, setOpen] = React.useState(false);
	const matches = useMediaQuery('(min-width:600px)');

	const handleDrawerToggle = (toggle = false) => {
		if ((toggle === true) || !matches) setOpen(!open);
	};

	return (
		<Container>
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
					<IconButton
						color="inherit"
						aria-label={edit ? 'Save' : 'Edit'}
						edge="start"
						onClick={() => setEdit(!edit)}
					>
						{edit ? <SaveIcon /> : <EditIcon />}
					</IconButton>
					<Settings
						fullScreen={!matches}
						signIn={signIn}
						signOut={signOut}
						user={user}
					/>
				</Toolbar>
			</AppBar>
			<DrawerPlaceholder smUp implementation="css" />
			<DrawerStyled
				variant={matches ? 'persistent' : 'temporary'}
				anchor="left"
				open={open}
				onOpen={handleDrawerToggle}
				onClose={handleDrawerToggle}
				ModalProps={{ keepMounted: true }}
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
		</Container>
	);
};

Header.defaultProps = defaultProps;
Header.propTypes = propTypes;

export default Header;

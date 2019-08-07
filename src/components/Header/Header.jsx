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
	Container,
	Content,
	DrawerHeader,
	DrawerPlaceholder,
	DrawerStyled,
	MenuButtonStyled,
	Title,
} from './Header.styled';
import Account from '../Account';
import DrawerContent from '../DrawerContent';

const propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
	loading: PropTypes.bool.isRequired,
	notes: PropTypes.instanceOf(Array).isRequired,
	signIn: PropTypes.func.isRequired,
	signOut: PropTypes.func.isRequired,
	user: PropTypes.instanceOf(Object).isRequired,
};

const Header = ({
	children,
	loading,
	notes,
	signIn,
	signOut,
	user,
}) => {
	const [open, setOpen] = React.useState(false);
	const matches = useMediaQuery('(min-width:600px)');

	const handleDrawerToggle = () => setOpen(!open);

	return (
		<Container>
			<AppBar position="fixed">
				<Toolbar>
					<MenuButtonStyled
						color="inherit"
						aria-label="Open drawer"
						edge="start"
						onClick={handleDrawerToggle}
					>
						<MenuIcon />
					</MenuButtonStyled>
					<Title variant="h6">NoteMe</Title>
					<Account
						user={user}
						signIn={signIn}
						signOut={signOut}
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

Header.propTypes = propTypes;

export default Header;

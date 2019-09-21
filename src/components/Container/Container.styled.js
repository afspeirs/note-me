import styled, { css } from 'styled-components';
import {
	Hidden,
	IconButton,
	SwipeableDrawer,
	Typography,
} from '@material-ui/core';

const drawerWidth = 256;

export const ContainerStyled = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	background-color: ${props => props.theme.palette.background.paper};
	color: ${props => props.theme.palette.text.primary};
`;

export const Content = styled.main`
	position: relative;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-left: -${drawerWidth}px;
	overflow-x: hidden;
	transition: ${props => props.theme.transitions.create('margin', {
		easing: props.theme.transitions.easing.sharp,
		duration: props.theme.transitions.duration.leavingScreen,
	})};

	${props => props.open && css`
		transition: ${props.theme.transitions.create('margin',
		{ // I dislike the location of this bracket, but it shuts eslint up
			easing: props.theme.transitions.easing.easeOut,
			duration: props.theme.transitions.duration.enteringScreen,
		})};
		margin-left: -${drawerWidth}px;

		${props.theme.breakpoints.up('sm')} {
			margin-left: 0;
		}
	`};
`;

export const MenuButtonStyled = styled(IconButton)`
	margin-right: ${props => props.theme.spacing(2)}px;
`;

export const DrawerPlaceholder = styled(Hidden)`
	width: ${drawerWidth}px;
`;

export const DrawerStyled = styled(SwipeableDrawer)`
	width: ${drawerWidth}px;
	flex-shrink: 0;

	.MuiDrawer-paper {
		width: ${drawerWidth}px;
	}
`;

export const DrawerHeader = styled.div`
	${props => props.theme.mixins.toolbar}
`;

export const Title = styled(Typography)`
	flex-grow: 1;
`;

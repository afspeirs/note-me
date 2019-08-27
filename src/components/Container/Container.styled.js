import styled, { css } from 'styled-components';
import {
	Hidden,
	IconButton,
	SwipeableDrawer,
	Typography,
} from '@material-ui/core';

import theme from '../../theme';

const drawerWidth = 256;

export const ContainerStyled = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
`;

export const Content = styled.main`
	position: relative;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-left: -${drawerWidth}px;
	overflow-x: hidden;
	transition: ${theme.transitions.create('margin', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	})};

	${props => props.open && css`
		transition: ${theme.transitions.create('margin',
		{ // I dislike the location of this bracket, but it shuts eslint up
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		})};
		margin-left: -${drawerWidth}px;

		${theme.breakpoints.up('sm')} {
			margin-left: 0;
		}
	`};
`;

export const MenuButtonStyled = styled(IconButton)`
	margin-right: ${theme.spacing(2)}px;
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
	${theme.mixins.toolbar}
`;

export const Title = styled(Typography)`
	flex-grow: 1;
`;

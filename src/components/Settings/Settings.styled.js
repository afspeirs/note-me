import styled from 'styled-components';
import {
	AppBar,
	Dialog,
	IconButton,
	Typography,
} from '@material-ui/core';

import theme from '../../theme';

export const AccountIcon = styled.img`
	width: 100%;
	height: 100%;
`;

export const AppBarStyled = styled(AppBar)`
	position: relative;
`;

export const DialogStyled = styled(Dialog)`
	/* TODO - Remove !important */
	z-index: ${theme.zIndex.appBar + 10} !important;
`;

export const MenuButtonStyled = styled(IconButton)`
	margin-right: ${theme.spacing(2)}px;
`;

export const Title = styled(Typography)`
	flex: 1;
`;

import styled from 'styled-components';
import { Avatar, Menu } from '@material-ui/core';

import theme from '../../theme';

export const AvatarStyled = styled(Avatar)`
	width: 24px;
	height: 24px;
`;

export const MenuStyled = styled(Menu)`
	/* TODO - Remove !important */
	z-index: ${theme.zIndex.appBar + 10} !important;
`;

export default MenuStyled;

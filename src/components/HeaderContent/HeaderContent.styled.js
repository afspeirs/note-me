import styled from 'styled-components';
import { Menu } from '@material-ui/core';

import theme from '../../theme';

export const MenuStyled = styled(Menu)`
	/* TODO - Remove !important */
	z-index: ${theme.zIndex.appBar + 10} !important;
`;

export default MenuStyled;

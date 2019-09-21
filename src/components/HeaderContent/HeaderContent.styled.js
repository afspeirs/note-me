import styled from 'styled-components';
import { Menu } from '@material-ui/core';

export const MenuStyled = styled(Menu)`
	/* TODO - Remove !important */
	z-index: ${props => props.theme.zIndex.appBar + 10} !important;
`;

export default MenuStyled;

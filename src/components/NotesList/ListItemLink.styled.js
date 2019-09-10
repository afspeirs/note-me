import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { ListItemText } from '@material-ui/core';

export const ListItemTextStyled = styled(ListItemText)`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

export const NavLinkStyled = styled(NavLink)`
	&:hover,
	&.active {
		background-color: rgba(0, 0, 0, 0.15);
	}
`;

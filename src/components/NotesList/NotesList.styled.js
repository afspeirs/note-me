import styled from 'styled-components';
import { List } from '@material-ui/core';
import Swipeout from 'rc-swipeout';

export const ListStyled = styled(List)`
	width: 100%;
`;

export const SwipeoutStyled = styled(Swipeout)`
	position: relative;

	.rc-swipeout-content {
		background-color: ${props => props.theme.palette.background.paper};
	}
`;

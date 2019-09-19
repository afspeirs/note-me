import styled from 'styled-components';
import { List } from '@material-ui/core';
import Swipeout from 'rc-swipeout';

import theme from '../../theme';

export const ListStyled = styled(List)`
	width: 100%;
`;

export const SwipeoutStyled = styled(Swipeout)`
	position: relative;

	.rc-swipeout-content {
		background-color: ${theme.palette.background.paper};
	}
`;

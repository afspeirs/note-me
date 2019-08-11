import styled from 'styled-components';
import { List, ListItemText } from '@material-ui/core';

export const ContextMenuStyled = styled.div`
	position: fixed;
	background: white;
	box-shadow: 0px 2px 10px #999999;
	z-index: 1000;
`;

export const ListStyled = styled(List)`
	max-width: 94vw;
`;

export const ListItemTextStyled = styled(ListItemText)`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

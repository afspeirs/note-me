import styled from 'styled-components';

import theme from '../../theme';

export const Container = styled.main`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: ${props => props.backgroundColor};
`;

export const Text = styled.p`
	color: ${props => props.color};
	margin: ${theme.spacing(2)}px;
`;

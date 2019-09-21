import styled from 'styled-components';
import { InputBase, List } from '@material-ui/core';
import { fade } from '@material-ui/core/styles';

export const ListStyled = styled(List)`
	flex-grow: 1;
	overflow-y: auto;
	overflow-x: hidden;
`;

export const SearchBarWrapper = styled.div`
	position: relative;
	border-radius: ${props => props.theme.shape.borderRadius}px;
	background-color: ${props => fade(props.theme.palette.common.black, 0.10)};

	&:hover {
		background-color: ${props => fade(props.theme.palette.common.black, 0.15)};
	}
`;

export const SearchIconWrapper = styled.div`
	position: absolute;
	width: ${props => props.theme.spacing(5)}px;
	height: 100%;
	pointer-events: none;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const SearchInput = styled(InputBase)`
	color: inherit;

	.MuiInputBase-input {
		padding: ${props => props.theme.spacing(1, 1, 1, 5)};
	}
`;

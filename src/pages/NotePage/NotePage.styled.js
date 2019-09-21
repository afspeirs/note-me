import styled, { css } from 'styled-components';

const page = css`
	width: inherit;
	flex-grow: 1;
	padding: ${props => props.theme.spacing(2)}px;
	overflow-y: scroll;
`;

export const MarkdownWrapper = styled.div`
	${page}
`;

export const Textarea = styled.textarea`
	${page}
	resize: none;
	border: none;
	font-size: 1.2em;
	background-color: ${props => props.theme.palette.background.paper};
	color: ${props => props.theme.palette.text.primary};

	:focus {
		outline: none;
	}
`;

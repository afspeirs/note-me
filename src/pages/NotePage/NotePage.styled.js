import styled, { css } from 'styled-components';

import theme from '../../theme';

const page = css`
	width: inherit;
	flex-grow: 1;
	padding: ${theme.spacing(2)}px;
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
	background-color: ${theme.palette.background.paper};
	color: ${theme.palette.text.primary};

	:focus {
		outline: none;
	}
`;

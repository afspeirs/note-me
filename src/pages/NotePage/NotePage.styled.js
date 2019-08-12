import styled, { css } from 'styled-components';

import theme from '../../theme';

const page = css`
	width: inherit;
	flex-grow: 1;
	padding: ${theme.spacing(2)}px;
`;

export const MarkdownWrapper = styled.div`
	${page}
`;

export const Textarea = styled.textarea`
	${page}
	resize: none;
	border: none;
	font-size: 1.2em;

	:focus {
		outline: none;
	}
`;

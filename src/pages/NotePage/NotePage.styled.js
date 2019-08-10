import styled from 'styled-components';

import theme from '../../theme';

export const MarkdownWrapper = styled.div`
	width: 100%;
	flex-grow: 1;
	padding: ${theme.spacing(2)}px;
`;

export const Textarea = styled.textarea`
	width: 100%;
	flex-grow: 1;
	padding: ${theme.spacing(2)}px;
	resize: none;
	border: none;
	font-size: 1.2em;

	:focus {
		outline: none;
	}
`;

import styled from 'styled-components';
import { Dialog } from '@material-ui/core';

import theme from '../../theme';

export const AccountIcon = styled.img`
	width: 100%;
	height: 100%;
`;

export const DialogStyled = styled(Dialog)`
	/* TODO - Remove !important */
	z-index: ${theme.zIndex.appBar + 10} !important;
`;
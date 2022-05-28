import { styled } from '@mui/material/styles';

export const Content = styled('main')(({ theme }) => ({
	height: '100%',
	display: 'flex',
	overflowY: 'auto',
	flexDirection: 'column',
	flex: 1,
	[theme.breakpoints.down('sm')]: {
		minWidth: '100vw',
	},
}));

const styles = {
	appBar: {
		zIndex: (theme) => theme.zIndex.drawer + 1,
	},
	toolbar: {
		left: 'env(titlebar-area-x, 0)',
		top: 'env(titlebar-area-y, 0)',
		width: 'env(titlebar-area-width, 100%)',
	},
	menuIcon: {
		mr: 2,
	},
	title: {
		flexGrow: 1,
		userSelect: 'none',
	},
};

export default styles;

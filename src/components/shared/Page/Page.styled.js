import { styled } from '@mui/material/styles';

import { drawerWidth } from '@/components/Drawer/Drawer.styled';

export const Content = styled('div', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
	width: '100%',
	display: 'flex',
	position: 'relative',
	flexGrow: 1,
	overflowX: 'hidden',
	paddingTop: 'env(safe-area-inset-top)',
	paddingLeft: 'env(safe-area-inset-left)',
	paddingRight: 'env(safe-area-inset-right)',
	flexDirection: 'column',
	transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	marginLeft: 0,
	...(open && {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
	}),
	[theme.breakpoints.down('sm')]: {
		minWidth: '100%',
	},
}));

export const Main = styled('main')({
	height: '100%',
	display: 'flex',
	overflowY: 'auto',
	flexDirection: 'column',
});

const styles = {
	root: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: 'background.paper',
		color: 'text.primary',
	},
	appBar: {
		zIndex: (theme) => theme.zIndex.drawer + 1,
	},
	menuIcon: {
		mr: 2,
	},
	title: {
		flexGrow: 1,
	},
};

export default styles;

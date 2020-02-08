import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 256;

const useStyles = makeStyles((theme) => ({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		display: 'flex',
		backgroundColor: theme.palette.background.paper,
		color: theme.palette.text.primary,
	},
	content: {
		position: 'relative',
		flexGrow: 1,
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		marginLeft: -drawerWidth,
		overflowX: 'hidden',
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	contentShift: {
		marginLeft: -drawerWidth,
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		[theme.breakpoints.up('sm')]: {
			marginLeft: 0,
		},
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerHeader: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	placeholder: {
		width: drawerWidth,
	},
	title: {
		flexGrow: 1,
	},
}));

export default useStyles;

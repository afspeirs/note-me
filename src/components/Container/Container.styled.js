import { makeStyles } from '@material-ui/core/styles';

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
		overflowX: 'hidden',
	},
	drawer: {
		flexShrink: 0,
		width: '80%',
		maxWidth: 320,
		zIndex: 0,
	},
	drawerHeader: theme.mixins.toolbar,
	drawerPaper: {
		width: 'inherit',
		maxWidth: 'inherit',
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		userSelect: 'none',
	},
}));

export default useStyles;

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	appBar: {
		paddingTop: 'env(safe-area-inset-top)',
		paddingLeft: 'env(safe-area-inset-left)',
		paddingRight: 'env(safe-area-inset-right)',
	},
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
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
		paddingTop: 'env(safe-area-inset-top)',
		paddingBottom: 'env(safe-area-inset-bottom)',
		paddingLeft: 'env(safe-area-inset-left)',
		paddingRight: 'env(safe-area-inset-right)',
	},
	drawer: {
		flexShrink: 0,
		width: '80%',
		maxWidth: 'calc(env(safe-area-inset-left) + 320px)',
		zIndex: 0,
	},
	drawerHeader: theme.mixins.toolbar,
	drawerPaper: {
		width: 'inherit',
		maxWidth: 'inherit',
		paddingTop: 'env(safe-area-inset-top)',
		paddingBottom: 'env(safe-area-inset-bottom)',
		paddingLeft: 'env(safe-area-inset-left)',
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		userSelect: 'none',
	},
}), {
	name: 'Container',
});

export default useStyles;

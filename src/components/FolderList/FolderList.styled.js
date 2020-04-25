import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	menuButton: {
		marginRight: theme.spacing(2),
	},
	root: {
		flexGrow: 1,
		overflowY: 'auto',
		overflowX: 'hidden',
	},
	box: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		zIndex: 1,
	},
}));

export default useStyles;

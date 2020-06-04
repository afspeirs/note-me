import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	menuButton: {
		marginRight: theme.spacing(2),
	},
	paper: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		minHeight: '100%',
		zIndex: 1,
	},
	root: {
		flexGrow: 1,
		overflowY: 'auto',
		overflowX: 'hidden',
	},
}));

export default useStyles;

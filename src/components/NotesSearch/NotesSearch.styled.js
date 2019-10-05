import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	list: {
		flexGrow: 1,
		overflowY: 'auto',
		overflowX: 'hidden',
	},
	search: {
		position: 'relative',
		width: '100%',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.black, 0.10),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.black, 0.15),
		},
	},
	searchIcon: {
		position: 'absolute',
		width: theme.spacing(5),
		height: '100%',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
		width: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 5),
	},
}));

export default useStyles;

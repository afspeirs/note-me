import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	search: {
		position: 'relative',
		width: '100%',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.black, 0.10),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.black, 0.15),
		},
	},
	searchClear: {
		marginRight: theme.spacing(0.5),
		marginLeft: -theme.spacing(0.5),
	},
	searchIcon: {
		position: 'absolute',
		right: 0,
		width: theme.spacing(5),
		pointerEvents: 'none',
	},
	inputRoot: {
		color: 'inherit',
		width: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1),
	},
}));

export default useStyles;

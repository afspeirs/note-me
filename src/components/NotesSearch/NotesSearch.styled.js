import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	menuButton: {
		marginRight: theme.spacing(2),
	},
	search: {
		position: 'relative',
		flexGrow: 1,
		width: '100%',
		fontSize: '1.25rem',
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

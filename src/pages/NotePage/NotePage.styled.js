import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	page: {
		width: 'inherit',
		flexGrow: 1,
		padding: theme.spacing(2),
		overflowY: 'auto',
	},
	textarea: {
		resize: 'none',
		border: 'none',
		fontSize: '1.2em',
		backgroundColor: theme.palette.background.paper,
		color: theme.palette.text.primary,
		':focus': {
			outline: 'none',
		},
	},
}));

export default useStyles;

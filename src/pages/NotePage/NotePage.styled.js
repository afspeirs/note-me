import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	page: {
		width: 'inherit',
		flexGrow: 1,
		padding: theme.spacing(2),
		paddingBottom: theme.spacing(10),
		overflowY: 'auto',
	},
	fab: {
		position: 'fixed',
		bottom: theme.spacing(2),
		right: theme.spacing(2),
		zIndex: 1,
	},
	extendedIcon: {
		marginRight: theme.spacing(1),
	},
	textarea: {
		resize: 'none',
		border: 'none',
		fontSize: '1.2em',
		backgroundColor: theme.palette.background.paper,
		color: theme.palette.text.primary,
		'&:focus': {
			outline: 'none',
		},
	},
	appBar: {
		top: 'auto',
		bottom: 0,
		zIndex: 0,
	},
	toolbar: {
		marginRight: theme.spacing(9),
	},
	spacer: {
		width: theme.spacing(3),
	},
}));

export default useStyles;

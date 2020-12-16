import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	page: {
		width: 'inherit',
		flexGrow: 1,
		padding: theme.spacing(2),
		paddingBottom: 56 + theme.spacing(4),
		overflowY: 'auto',
	},
	fab: {
		position: 'absolute',
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
	extendedIcon: {
		marginRight: theme.spacing(1),
	},
	markdown: {
		'& p + p': {
			marginTop: theme.spacing(2),
		},
		'& h1': {
			fontSize: '1.75em',
		},
		'& ol, ul': {
			paddingLeft: theme.spacing(4),
		},
		'& h1, h2, h3, h4, h5, h6, p, ol, ul': {
			margin: 0,
			marginBottom: theme.spacing(2),
		},
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
}));

export default useStyles;

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
	},
	dialog: {
		// TODO - Remove !important
		zIndex: `${theme.zIndex.appBar + 10} !important`,
	},
	listItemText: {
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
	},
	numberSelected: {
		paddingLeft: theme.spacing(1),
		marginRight: 'auto',
	},
	maxSelected: {
		color: theme.palette.info.main,
	},
}));

export default useStyles;

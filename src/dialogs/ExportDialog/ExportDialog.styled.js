import { makeStyles } from '@material-ui/core/styles';

// const DialogContent = withStyles(theme => ({
// 	root: {
// 		padding: theme.spacing(2),
// 	},
// }))(MuiDialogContent);

// const DialogActions = withStyles(theme => ({
// 	root: {
// 		margin: 0,
// 		padding: theme.spacing(1),
// 	},
// }))(MuiDialogActions);

const useStyles = makeStyles((theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
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
}));

export default useStyles;

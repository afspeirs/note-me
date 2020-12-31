import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	dialog: {
		minHeight: 'calc(100% - 64px)',
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
	},
	title: {
		maxWidth: '90%',
	},
}));

export default useStyles;

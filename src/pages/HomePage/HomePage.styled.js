import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	centered: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: '100%',
	},
	fab: {
		position: 'fixed',
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
	page: {
		display: 'flex',
		flexGrow: 1,
		overflowY: 'auto',
		overflowX: 'hidden',
	},
}));

export default useStyles;

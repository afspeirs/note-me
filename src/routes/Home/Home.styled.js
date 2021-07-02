import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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

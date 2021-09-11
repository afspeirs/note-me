import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	fab: {
		position: 'fixed',
		bottom: `calc(env(safe-area-inset-bottom) + ${theme.spacing(2)}px)`,
		right: `calc(env(safe-area-inset-right) + ${theme.spacing(2)}px)`,
	},
	page: {
		display: 'flex',
		flexGrow: 1,
		overflowY: 'auto',
		overflowX: 'hidden',
	},
}));

export default useStyles;

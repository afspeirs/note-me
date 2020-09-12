import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	centered: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: '100%',
	},
	page: {
		display: 'flex',
		flexGrow: 1,
		overflowY: 'auto',
		overflowX: 'hidden',
	},
});

export default useStyles;

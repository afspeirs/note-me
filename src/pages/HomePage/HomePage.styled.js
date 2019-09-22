import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	page: {
		display: 'flex',
		flexGrow: 1,
		overflowY: 'auto',
		overflowX: 'hidden',
	},
}));

export default useStyles;

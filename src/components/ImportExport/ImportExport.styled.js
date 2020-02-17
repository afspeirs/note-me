import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	input: {
		display: 'none',
	},
	confirm: {
		// TODO - Remove !important
		zIndex: `${theme.zIndex.appBar + 10} !important`,
	},
}));

export default useStyles;

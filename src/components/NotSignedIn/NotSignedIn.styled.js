import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	list: {
		width: '100%',
	},
	swipeout: {
		position: 'relative',
		'& .rc-swipeout-content': {
			backgroundColor: theme.palette.background.paper,
		},
	},
}));

export default useStyles;

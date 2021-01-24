import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	navLink: {
		'&.active': {
			backgroundColor: theme.palette.action.focus,
		},
	},
}));

export default useStyles;

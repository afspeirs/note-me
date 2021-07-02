import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	chip: {
		marginLeft: theme.spacing(1),
	},
	list: {
		flexGrow: 1,
		overflowY: 'auto',
		overflowX: 'hidden',
		paddingBottom: 56 + theme.spacing(4),
	},
	listItemSecondary: {
		display: 'flex',
		pointerEvents: 'none',
	},
	listItemTextDate: {
		userSelect: 'none',
		margin: 0,
	},
}));

export default useStyles;

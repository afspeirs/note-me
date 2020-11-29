import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	chip: {
		marginLeft: theme.spacing(1),
	},
	list: {
		flexGrow: 1,
		overflowY: 'auto',
		overflowX: 'hidden',
	},
	listItem: {
		'&:hover,&.active': {
			backgroundColor: 'rgba(0, 0, 0, 0.15)',
		},
	},
	listItemSecondary: {
		display: 'flex',
		pointerEvents: 'none',
	},
	listItemText: {
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
}));

export default useStyles;

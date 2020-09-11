import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
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
	listItemText: {
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
	},
	secondaryAction: {
		pointerEvents: 'none',
	},
}));

export default useStyles;

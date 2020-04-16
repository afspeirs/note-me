import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	list: {
		width: '100%',
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
	nested: {
		paddingLeft: theme.spacing(4),
	},
	secondaryAction: {
		pointerEvents: 'none',
	},
	swipeout: {
		position: 'relative',
		'& .rc-swipeout-content': {
			backgroundColor: theme.palette.background.paper,
		},
	},
}));

export default useStyles;

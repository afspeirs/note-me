import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	chip: {
		marginLeft: theme.spacing(1),
	},
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
}));

export default useStyles;

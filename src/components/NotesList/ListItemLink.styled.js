import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
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
}));

export default useStyles;

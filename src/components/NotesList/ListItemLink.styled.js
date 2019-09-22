import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	listItemText: {
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
	},
	navLink: {
		'&:hover,&.active': {
			backgroundColor: 'rgba(0, 0, 0, 0.15)',
		},
	},
}));

export default useStyles;

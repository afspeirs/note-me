import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	list: {
		flexGrow: 1,
		overflowY: 'auto',
		overflowX: 'hidden',
	},
	listItem: {
		'&.active': {
			backgroundColor: theme.palette.action.focus,
		},
	},
	listItemTypography: {
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
	},
	listSubheader: {
		userSelect: 'none',
	},
	subheader: {
		backgroundColor: theme.palette.background.paper,
	},
}));

export default useStyles;

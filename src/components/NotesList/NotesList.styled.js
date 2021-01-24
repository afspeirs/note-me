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
	listItemTypography: {
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
	},
	listItemTextDate: {
		userSelect: 'none',
		margin: 0,
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
}));

export default useStyles;

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	paper: (props) => ({
		height: props.maxHeight ? '100%' : '',
	}),
	appBarPadding: {
		paddingTop: 'env(safe-area-inset-top)',
		paddingLeft: 'env(safe-area-inset-left)',
		paddingRight: 'env(safe-area-inset-right)',
	},
	children: {
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
		overflowY: 'auto',
	},
	childrenPadding: {
		paddingLeft: 'env(safe-area-inset-left)',
		paddingRight: 'env(safe-area-inset-right)',
		'& > *:last-child': {
			marginBottom: 'env(safe-area-inset-bottom)',
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flex: 1,
		userSelect: 'none',
	},
}), {
	name: 'Modal',
});

export default useStyles;

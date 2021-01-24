import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	dropZone: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		pointerEvents: 'none',
		visibility: 'hidden',
		backgroundColor: theme.palette.text.disabled,
		opacity: 0,
		transition: 'opacity 0.2s ease',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 10000,
		'&:before': {
			position: 'absolute',
			content: '""',
			top: 0,
			left: 0,
			width: 'calc(100% - 16px)',
			height: 'calc(100% - 16px)',
			margin: 8,
			border: `4px dashed ${theme.palette.background.default}`,
		},
	},
	dragging: {
		opacity: 1,
		pointerEvents: 'initial',
		visibility: 'visible',
	},
}));

export default useStyles;

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
		zIndex: 10000,
	},
	dragging: {
		background: 'rgba(0, 0, 0, 0.3)',
		pointerEvents: 'initial',
		visibility: 'visible',
	},
}));

export default useStyles;

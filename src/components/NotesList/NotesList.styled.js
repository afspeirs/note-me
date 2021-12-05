const styles = {
	root: {
		position: 'relative',
		flexGrow: 1,
		overflow: 'hidden',
	},
	list: {
		overflowY: 'auto',
		overflowX: 'hidden',
		height: '100%',
	},
	listItemSecondary: {
		display: 'flex',
		pointerEvents: 'none',
	},
	listItemTextDate: {
		userSelect: 'none',
		margin: 0,
	},
	folderView: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		backgroundColor: 'background.paper',
		zIndex: 10,
	},
	menuIcon: {
		mr: 2,
	},
};

export default styles;

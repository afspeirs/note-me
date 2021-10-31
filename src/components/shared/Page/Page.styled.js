const styles = {
	root: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: 'background.paper',
		color: 'text.primary',
	},
	content: {
		width: '100%',
		display: 'flex',
		position: 'relative',
		flexGrow: 1,
		overflowX: 'hidden',
		paddingTop: 'env(safe-area-inset-top)',
		paddingLeft: 'env(safe-area-inset-left)',
		paddingRight: 'env(safe-area-inset-right)',
		flexDirection: 'column',
	},
	main: {
		height: '100%',
		display: 'flex',
		overflowY: 'auto',
		flexDirection: 'column',
	},
	menuIcon: {
		mr: 2,
	},
	title: {
		flexGrow: 1,
		userSelect: 'none',
	},
};

export default styles;

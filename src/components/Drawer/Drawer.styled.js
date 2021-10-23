export const drawerWidth = 320;

const styles = {
	backdrop: {
		zIndex: (theme) => theme.zIndex.drawer - 1,
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		'& .MuiDrawer-paper': {
			width: drawerWidth,
			boxSizing: 'border-box',
		},
	},
};

export default styles;

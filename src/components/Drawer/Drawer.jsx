import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
	Backdrop,
	Drawer as MuiDrawer,
	Toolbar,
	useMediaQuery,
} from '@mui/material';

import DrawerContent from '@/components/DrawerContent';
import { useGlobalState } from '@/hooks/GlobalState';
import { useHotkeys } from '@/hooks/Hotkeys';
import styles from './Drawer.styled';

const Drawer = () => {
	const [{ drawerOpen }, dispatch] = useGlobalState();
	const history = useHistory();
	const mobile = useMediaQuery('(max-width:600px)');

	const handleDrawerClose = () => dispatch({
		type: 'app-drawerOpen',
		value: false,
	});

	useHotkeys([
		// B = Toggle sidebar
		{
			keys: ['b'],
			callback: (event) => {
				event.preventDefault();
				dispatch({ type: 'app-drawerOpen' });
			},
			metaModifier: true,
		},
		// P or S = Disable Event
		{
			keys: ['p', 's'],
			callback: (event) => event.preventDefault(),
			metaModifier: true,
		},
	]);

	// Run handleDrawerClose if the history changes
	useEffect(() => {
		const unlisten = history.listen(() => mobile && handleDrawerClose());
		return unlisten;
	}, [history, mobile]);

	return (
		<>
			<MuiDrawer
				anchor="left"
				onClose={handleDrawerClose}
				open={drawerOpen}
				sx={styles.drawer}
				variant="persistent"
			>
				<Toolbar />
				<DrawerContent />
			</MuiDrawer>

			<Backdrop
				invisible
				onClick={handleDrawerClose}
				open={mobile && drawerOpen}
				sx={styles.backdrop}
			/>
		</>
	);
};

export default Drawer;

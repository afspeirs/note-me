import PropTypes from 'prop-types';
import {
	AppBar,
	Divider,
	IconButton,
	List,
	Toolbar,
	Typography,
} from '@mui/material';
import {
	Add as AddIcon,
	ChevronLeft as LeftIcon,
	Home as HomeIcon,
	Settings as SettingsIcon,
} from '@mui/icons-material';

import NotesList from '@/components/NotesList';
import CheckForInstallPrompt from '@/components/shared/CheckForInstallPrompt';
import ListButton from '@/components/shared/ListButton';
import { useNotes } from '@/hooks/Notes';
import styles from './DrawerContent.styled';

const propTypes = {
	handleDrawerToggle: PropTypes.func.isRequired,
};

const DrawerContent = ({
	handleDrawerToggle,
}) => {
	const { createNote } = useNotes();

	return (
		<>
			<AppBar
				position="relative"
				color="transparent"
				elevation={0}
			>
				<Toolbar>
					<Typography variant="h6" component="span" noWrap sx={styles.title}>
						{import.meta.env.VITE_APP_TITLE}
					</Typography>
					<IconButton
						size="large"
						edge="end"
						color="inherit"
						aria-label="menu"
						sx={styles.menuIcon}
						onClick={handleDrawerToggle}
					>
						<LeftIcon />
					</IconButton>
				</Toolbar>
			</AppBar>

			<Divider />

			<NotesList />

			<Divider />

			<List disablePadding>
				<CheckForInstallPrompt />

				<ListButton
					Icon={AddIcon}
					onClick={() => createNote()}
					primary="Create Note"
				/>

				<ListButton
					Icon={HomeIcon}
					primary="Home"
					to="/"
				/>

				<ListButton
					Icon={SettingsIcon}
					primary="Settings"
					to="/settings/"
				/>
			</List>
		</>
	);
};

DrawerContent.propTypes = propTypes;

export default DrawerContent;

import React, { useEffect, useRef, useState } from 'react';
import {
	Button,
	CircularProgress,
	IconButton,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
} from '@material-ui/core';
import {
	Refresh as RefreshIcon,
} from '@material-ui/icons';

import { useGlobalState } from '../../hooks/GlobalState';

const CheckForUpdate = () => {
	const [{ updateAvailable }] = useGlobalState();
	const [loading, setLoading] = useState(false);
	const timer = useRef();

	// This abominable one-liner will clear the timer if CheckForUpdate unmounts
	useEffect(() => () => clearTimeout(timer.current), []);

	const updateServiceWorker = () => {
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.ready.then((registration) => registration.update());
		} else {
			setTimeout(() => window.location.reload(window.location.href), 1500);
		}
	};

	const handleButtonClick = () => {
		if (!loading) {
			setLoading(true);
			updateServiceWorker();
			timer.current = setTimeout(() => setLoading(false), 2000);
		}
	};

	return (
		<ListItem>
			<ListItemText primary="Check for update" />
			{updateAvailable ? (
				<ListItemSecondaryAction>
					<Button
						variant="contained"
						color="primary"
						onClick={() => window.location.reload(true)}
					>
						Update
					</Button>
				</ListItemSecondaryAction>
			) : (
				<ListItemSecondaryAction>
					{loading ? (
						<CircularProgress size={24} color="inherit" />
					) : (
						<IconButton
							color="inherit"
							disabled={loading}
							onClick={handleButtonClick}
							edge="end"
						>
							<RefreshIcon />
						</IconButton>
					)}
				</ListItemSecondaryAction>
			)}
		</ListItem>
	);
};

export default CheckForUpdate;

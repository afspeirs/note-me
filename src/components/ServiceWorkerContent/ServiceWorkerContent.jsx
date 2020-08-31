import { useEffect } from 'react';
import { useSnackbar } from '../../hooks/Snackbar';
import { useGlobalState } from '../../hooks/GlobalState';

const ServiceWorkerContent = () => {
	const dispatch = [...useGlobalState()].pop(); // I don't need to access any of the reducer state
	const snackbar = useSnackbar();

	const swNewContentAvailable = () => {
		snackbar.showMessage({
			message: 'A new version is available',
			actionText: 'Update',
			actionFunction: () => window.location.reload(true),
		});
		dispatch({
			type: 'app-updateAvailable',
			value: true,
		});
	};

	const swContentCached = () => {
		snackbar.showMessage({
			message: 'Caching complete! Now available offline',
		});
	};

	useEffect(() => {
		window.addEventListener('swNewContentAvailable', swNewContentAvailable);
		window.addEventListener('swContentCached', swContentCached);

		return () => {
			window.removeEventListener('swNewContentAvailable', swNewContentAvailable);
			window.removeEventListener('swContentCached', swContentCached);
		};
	}, []); // eslint-disable-line

	return null;
};

export default ServiceWorkerContent;

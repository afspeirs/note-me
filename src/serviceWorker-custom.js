/* eslint-disable no-restricted-globals */

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('beforeinstallprompt', (event) => {
	// Don't show the mini-info bar
	event.preventDefault();

	// New Content Available event
	const customEvent = new CustomEvent('swBeforeInstallPrompt', {
		installPrompt: event,
	});

	window.dispatchEvent(customEvent);
});

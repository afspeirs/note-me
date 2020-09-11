export const capitaliseString = (string) => string.charAt(0).toUpperCase() + string.slice(1);
export const getTimeFromDate = (date) => new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
export const getTitle = (text) => (text.length > 0 ? text.split('\n')[0].replace(/#+ /g, '') : 'Untitled');
export const isPathOnPage = (location, path) => Boolean(
	(location.state?.modal === '/settings/' && window.previousLocation?.pathname.startsWith(path))
	|| location.pathname.startsWith(path),
);
export const isPathVisible = (location, path) => Boolean(
	!(location.state?.modal && window.previousLocation?.pathname === path)
	&& location.pathname !== path,
);

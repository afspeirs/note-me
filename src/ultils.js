export const capitaliseString = (string) => string.charAt(0).toUpperCase() + string.slice(1);
export const getTimeFromDate = (date) => new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
export const getTitle = (text) => (text ? text.split('\n')[0].replace(/#+ /g, '') : 'Untitled');

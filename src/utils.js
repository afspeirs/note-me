export const getTitle = (text) => {
	const title = text.split('\n')[0].replace(/#+ /g, '');

	return title.length > 0 ? title : 'Untitled';
};

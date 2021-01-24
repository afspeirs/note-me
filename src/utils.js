import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(calendar);
dayjs.extend(relativeTime);

export const getDateCalendar = (date) => dayjs(date).calendar(null, {
	sameDay: '[today at] h:mm A',
	lastDay: '[yesterday at] h:mm A',
	lastWeek: '[last] dddd [at] h:mm A',
	sameElse: 'DD/MM/YYYY [at] h:mm A',
});
export const getDateRelative = (date) => dayjs(date).fromNow();
export const getTitle = (text) => {
	const title = text.split('\n')[0].replace(/#+ /g, '');

	return title.length > 0 ? title : 'Untitled';
};

import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const propTypes = {
	date: PropTypes.number.isRequired,
};

const TimeAgo = ({ date }) => {
	const fromNow = dayjs(date).fromNow();

	return (
		<>{`Updated ${fromNow}`}</>
	);
};

TimeAgo.propTypes = propTypes;

export default TimeAgo;

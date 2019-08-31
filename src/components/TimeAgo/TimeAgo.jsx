import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	date: PropTypes.number.isRequired,
};

// Epochs
const epochs = [
	['year', 31536000],
	['month', 2592000],
	['day', 86400],
	['hour', 3600],
	['minute', 60],
	['second', 1],
];

// Get duration
const getDuration = (timeAgoInSeconds) => {
	for (let i = 0; i < epochs.length; i += 1) {
		const name = epochs[i][0];
		const seconds = epochs[i][1];
		const interval = Math.floor(timeAgoInSeconds / seconds);

		if (interval >= 1) {
			return {
				interval,
				epoch: name,
			};
		}
	}
	return {
		interval: 0,
		epoch: 'moment',
	};
};

// Takes a date in seconds as a parameter
const getTimeAgo = (date) => {
	const timeAgoInSeconds = Math.floor((new Date() / 1000) - new Date(date));
	const { interval, epoch } = getDuration(timeAgoInSeconds);
	const suffix = interval <= 1 ? '' : 's';

	return `Updated ${interval === 0 ? 'a' : interval} ${epoch}${suffix} ago`;
};

const TimeAgo = ({ date }) => (
	<>{getTimeAgo(date)}</>
);

TimeAgo.propTypes = propTypes;

export default TimeAgo;

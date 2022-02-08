import PropTypes from 'prop-types';
import {
	Chip,
	ListItem,
} from '@mui/material';

import { useGlobalState } from '@/hooks/GlobalState';
import styles from './NotesDisplayLabels.styled';

const defaultProps = {
	labels: null,
	onClick: () => {},
};

const propTypes = {
	onClick: PropTypes.func,
	labels: PropTypes.arrayOf(PropTypes.string),
};

const NotesDisplayLabels = ({
	labels,
	onClick,
}) => {
	const dispatch = [...useGlobalState()].pop(); // I don't need to access any of the reducer state

	const handleLabelClick = (label) => {
		onClick();

		dispatch({
			type: 'app-search',
			value: {
				show: true,
				text: label,
			},
		});
	};

	if (!labels) return null;
	return (
		<ListItem sx={styles.chipWrapper}>
			{labels.map((label) => (
				<Chip
					key={label}
					clickable
					label={label}
					onClick={() => handleLabelClick(label)}
				/>
			))}
		</ListItem>
	);
};

NotesDisplayLabels.defaultProps = defaultProps;
NotesDisplayLabels.propTypes = propTypes;

export default NotesDisplayLabels;

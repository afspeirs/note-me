import React, { useState } from 'react';
import {
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	FormControl,
	Select,
	MenuItem,
} from '@material-ui/core';

import { useStateValue } from '../StateContext';

const SortNotes = () => {
	const [{ sort }, dispatch] = useStateValue();
	const [value, setValue] = useState(sort);

	const handleChange = (event) => {
		dispatch({
			type: 'changeSort',
			value: event.target.value,
		});
		setValue(event.target.value);
	};

	const values = [
		{ text: 'Date: Ascending', value: 'date-asc' },
		{ text: 'Date: Descending', value: 'date-dsc' },
		{ text: 'Title: Descending', value: 'title-asc' },
		{ text: 'Title: Descending', value: 'title-dsc' },
	];

	return (
		<ListItem>
			<ListItemText primary="Sort Notes by:" />
			<ListItemSecondaryAction>
				<form autoComplete="off">
					<FormControl>
						<Select
							value={value}
							onChange={handleChange}
							inputProps={{
								name: 'sort-note',
								id: 'select-sort-note',
							}}
						>
							{values.map(item => (
								<MenuItem key={item.value} value={item.value}>{item.text}</MenuItem>
							))}
						</Select>
					</FormControl>
				</form>
			</ListItemSecondaryAction>
		</ListItem>
	);
};

export default SortNotes;

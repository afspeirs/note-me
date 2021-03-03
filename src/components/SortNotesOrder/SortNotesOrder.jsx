import { useState } from 'react';
import {
	Dialog,
	DialogTitle,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@material-ui/core';
import {
	Sort as SortIcon,
} from '@material-ui/icons';

import { useGlobalState } from '../../hooks/GlobalState';

const options = [
	{ text: 'Date Created (Newest First)', value: 'date-created-asc' },
	{ text: 'Date Created (Oldest First)', value: 'date-created-dsc' },
	{ text: 'Date Modified (Newest First)', value: 'date-modified-asc' },
	{ text: 'Date Modified (Oldest First)', value: 'date-modified-dsc' },
	{ text: 'Title (A-Z)', value: 'title-asc' },
	{ text: 'Title (Z-A)', value: 'title-dsc' },
];

const SortNotes = () => {
	const [{ settings: { sortNotesOrder } }, dispatch] = useGlobalState();
	const [open, setOpen] = useState(false);
	// eslint-disable-next-line max-len
	const [selectedIndex, setSelectedIndex] = useState(options.findIndex((item) => item.value === sortNotesOrder));

	const handleClose = () => setOpen(false);

	const handleClickMenuItem = (index) => {
		setSelectedIndex(index);
		setOpen(false);

		dispatch({
			type: 'settings-sortNotesOrder',
			value: options[index].value,
		});
	};

	return (
		<>
			<ListItem button onClick={() => setOpen(true)}>
				<ListItemIcon>
					<SortIcon />
				</ListItemIcon>
				<ListItemText
					primary="Sort Notes"
					secondary={options[selectedIndex].text}
				/>
			</ListItem>

			<Dialog
				aria-labelledby="sort-notes-dialog"
				fullWidth
				maxWidth="xs"
				onClose={handleClose}
				open={open}
			>
				<DialogTitle id="sort-notes-dialog">Sort Notes</DialogTitle>
				<List>
					{options.map((option, index) => (
						<ListItem
							key={option.text}
							button
							onClick={() => handleClickMenuItem(index)}
							selected={index === selectedIndex}
							autoFocus={index === selectedIndex}
						>
							<ListItemText primary={option.text} />
						</ListItem>
					))}
				</List>
			</Dialog>
		</>
	);
};

export default SortNotes;

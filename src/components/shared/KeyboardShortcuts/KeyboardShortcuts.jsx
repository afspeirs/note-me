import { useState } from 'react';
import {
	Dialog,
	DialogTitle,
	ListItem,
	ListItemIcon,
	ListItemText,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import {
	Keyboard as KeyboardIcon,
} from '@mui/icons-material';

import data from './data';

const KeyboardShortcuts = () => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<>
			<ListItem button onClick={handleOpen}>
				<ListItemIcon>
					<KeyboardIcon />
				</ListItemIcon>
				<ListItemText primary="View Keyboard Shortcuts" />
			</ListItem>

			<Dialog
				aria-labelledby="change-theme-dialog"
				fullWidth
				maxWidth="xs"
				onClose={handleClose}
				open={open}
			>
				<DialogTitle id="change-theme-dialog">Keyboard Shortcuts</DialogTitle>

				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell align="right">Shortcut</TableCell>
								<TableCell>Description</TableCell>
							</TableRow>
						</TableHead>
						{data.map((section) => (
							<TableBody key={section.name}>
								<TableRow>
									<TableCell colSpan={2}>{`${section.name} Shortcuts`}</TableCell>
								</TableRow>
								{section.shortcuts.map((row) => (
									<TableRow key={row.name}>
										<TableCell align="right">{row.key}</TableCell>
										<TableCell>{row.name}</TableCell>
									</TableRow>
								))}
							</TableBody>
						))}
					</Table>
				</TableContainer>
			</Dialog>
		</>
	);
};

export default KeyboardShortcuts;

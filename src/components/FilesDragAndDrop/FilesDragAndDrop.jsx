import { useEffect, useRef, useState } from 'react';
import { useConfirm } from 'material-ui-confirm';

import { useNotes } from '@/hooks/Notes';
import { useSnackbar } from '@/hooks/Snackbar';
import { DropZoneStyled } from './FilesDragAndDrop.styled';

const FilesDragAndDrop = () => {
	const confirm = useConfirm();
	const { createNote, importNotes } = useNotes();
	const drop = useRef(null);
	const snackbar = useSnackbar();
	const [dragging, setDragging] = useState(false);
	const [fileContent, setFileContent] = useState(null);

	const handleDragOver = (event) => {
		event.preventDefault();
		event.stopPropagation();
	};

	const handleDrop = (event) => {
		event.preventDefault();
		event.stopPropagation();

		const { files } = event.dataTransfer;

		if (files.length === 1) {
			const [file] = files;
			// console.log(file);

			if (
				file.name.toLowerCase().endsWith('json')
				|| file.name.toLowerCase().endsWith('md')
				|| file.type.toLowerCase().startsWith('text/')
			) {
				const reader = new FileReader();
				reader.onload = () => setFileContent(reader.result);
				reader.readAsText(file);
			} else {
				snackbar.showMessage({
					message: 'Only JSON/markdown/text files are supported',
				});
			}
		} else if (files.length > 1) {
			snackbar.showMessage({
				message: 'Only one file can be imported at a time',
			});
		}

		setDragging(false);
	};

	const handleDragEnterWindow = () => setDragging(true);

	const handleDragEnter = (event) => {
		event.preventDefault();
		event.stopPropagation();

		setDragging(true);
	};

	const handleDragLeave = (event) => {
		event.preventDefault();
		event.stopPropagation();

		setDragging(false);
		setFileContent(false);
	};

	useEffect(() => {
		if (fileContent) {
			if (fileContent.startsWith('[{')) {
				const listOfNotes = JSON.parse(fileContent) || [];

				confirm({
					title: 'Do you want to import the following notes?',
					description: listOfNotes.map((note) => `"${note.title}"`).join(', '),
					cancellationText: 'No',
					confirmationText: 'Yes',
				}).then(() => {
					importNotes(listOfNotes);
					setFileContent(null);
				}).catch(() => setFileContent(null));
			} else {
				confirm({
					title: 'Do you want to import the file with the following contents?',
					description: fileContent,
					cancellationText: 'No',
					confirmationText: 'Yes',
				})
					.then(() => {
						createNote(fileContent);
						setFileContent(null);
					})
					.catch(() => setFileContent(null));

				setFileContent(null);
			}
		}
	}, [fileContent]);

	useEffect(() => {
		const { current } = drop;
		current.addEventListener('dragover', handleDragOver);
		current.addEventListener('drop', handleDrop);
		window.addEventListener('dragenter', handleDragEnterWindow);
		current.addEventListener('dragenter', handleDragEnter);
		current.addEventListener('dragleave', handleDragLeave);

		return () => {
			current.removeEventListener('dragover', handleDragOver);
			current.removeEventListener('drop', handleDrop);
			window.removeEventListener('dragenter', handleDragEnterWindow);
			current.removeEventListener('dragenter', handleDragEnter);
			current.removeEventListener('dragleave', handleDragLeave);
		};
	}, []);

	return (
		<DropZoneStyled
			aria-hidden="true"
			ref={drop}
			dragging={dragging}
		/>
	);
};

export default FilesDragAndDrop;

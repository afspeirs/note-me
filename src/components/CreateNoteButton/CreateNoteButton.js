import React from 'react';
import { Link } from "react-router-dom";
import { Button } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

const CreateNoteButton = (props) => {
	const { notes } = props;
	const styles = {
		fab: {
			position: 'fixed',
			bottom: '16px',
			right: '16px',
		},
	}

	return (
		<Button
			component={Link}
			to={{ pathname: '/note', state: { index: notes.length } }}
			variant="fab"
			style={styles.fab}
			color="primary"
			aria-label="add"
		>
			<AddIcon />
		</Button>
	);
}

export default CreateNoteButton;

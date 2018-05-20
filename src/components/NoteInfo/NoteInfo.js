import React from 'react'
import { Paper, Typography } from '@material-ui/core';

const NoteInfo = (props) => {
	const { note } = props;
	const styles = {
		paper: {
			padding: 16,
			marginBottom: 8
		}
	}

	return (
		<Paper style={styles.paper} elevation={4}>
			<Typography component="p">
				{note.text ? note.text.split('\n')[0] : 'Untitled'}
			</Typography>
			<Typography component="p">
				{note.date ? note.date : 'No Date Provided'}
			</Typography>
		</Paper>
	)
}

export default NoteInfo;

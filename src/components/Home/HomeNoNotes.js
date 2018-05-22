import React from 'react';
import { Typography } from '@material-ui/core';
import { ArrowDownward as ArrowDownwardIcon } from '@material-ui/icons';

const HomeNoNotes = () => {
	const styles = {
		arrowContainer: {
			position: 'absolute',
			bottom: '70px',
			right: '12px',
			width: '64px',
		},
		arrow: {
			fontSize: '64px',
		}
	}
	return (
		<div style={styles.arrowContainer}>
			<Typography component="p" align="center">
				Make a note
			</Typography>
			<ArrowDownwardIcon style={styles.arrow} />
		</ div>
	);
}

export default HomeNoNotes;

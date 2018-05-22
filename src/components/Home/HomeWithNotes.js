import React from 'react';
import { Link } from "react-router-dom";
import NoteInfo from "./../NoteInfo/NoteInfo";

const HomeWithNotes = (props) => {
	const { notes, styles } = props;
	return (
		notes.map((note, index) => (
			<Link
				key={`note-${index}`}
				style={styles.anchor}
				to={{ pathname: '/note', state: { index } }}
			>
				<NoteInfo note={note} />
			</Link>
		))
	);
}

export default HomeWithNotes;

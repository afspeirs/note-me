import React from 'react';
import HomeNoNotes from "./HomeNoNotes";
import HomeWithNotes from "./HomeWithNotes";

const Home = (props) => {
	const { notes, styles } = props;

	if (notes.length) {
		return <HomeWithNotes notes={notes} styles={styles} />;
	}
	return <HomeNoNotes />;
}

export default Home;

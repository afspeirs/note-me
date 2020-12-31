const initialState = {
	containerTitle: null,
	search: {
		show: false,
		text: '',
	},
	settings: {
		darkTheme: JSON.parse(localStorage.getItem('settings-darkTheme')) || false,
		sortNotes: localStorage.getItem('settings-sortNotes') || 'date-asc',
		sortNotesFavourite: JSON.parse(localStorage.getItem('settings-sortNotesFavourite')) || false,
	},
	updateAvailable: false,
};

export default initialState;

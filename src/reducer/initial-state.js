const initialState = {
	containerTitle: null,
	search: {
		show: false,
		text: '',
	},
	settings: {
		appTheme: localStorage.getItem('settings-appTheme') || 'default',
		sortNotes: localStorage.getItem('settings-sortNotes') || 'date-asc',
		sortNotesFavourite: JSON.parse(localStorage.getItem('settings-sortNotesFavourite')) || false,
	},
	updateAvailable: false,
};

export default initialState;

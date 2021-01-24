const initialState = {
	containerTitle: null,
	search: {
		show: false,
		text: '',
	},
	settings: {
		appTheme: localStorage.getItem('settings-appTheme') || 'default',
		sortNotesFavourite: JSON.parse(localStorage.getItem('settings-sortNotesFavourite')) || false,
		sortNotesOrder: localStorage.getItem('settings-sortNotesOrder') || 'date-modified-asc',
	},
	updateAvailable: false,
};

export default initialState;

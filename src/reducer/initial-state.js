const initialState = {
	beforeInstallPrompt: undefined,
	containerTitle: undefined,
	search: {
		show: false,
		text: '',
	},
	settings: {
		appTheme: JSON.parse(localStorage.getItem('settings-appTheme')) || 'default',
		sortNotesFavourite: JSON.parse(localStorage.getItem('settings-sortNotesFavourite')) || false,
		sortNotesOrder: JSON.parse(localStorage.getItem('settings-sortNotesOrder')) || 'date-modified-asc',
	},
	updateAvailable: false,
};

export default initialState;

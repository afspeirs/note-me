export default {
	beforeInstallPrompt: null,
	drawerOpen: true,
	search: {
		text: '',
	},
	settings: {
		appTheme: JSON.parse(localStorage.getItem('settings-appTheme')) || 'default',
		sortNotesFavourite: JSON.parse(localStorage.getItem('settings-sortNotesFavourite')) || false,
		sortNotesOrder: JSON.parse(localStorage.getItem('settings-sortNotesOrder')) || 'date-modified-asc',
		sortNotesShowFolders: JSON.parse(localStorage.getItem('settings-sortNotesShowFolders')) || false,
	},
	updateAvailable: false,
};

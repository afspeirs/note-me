export const initialState = {
	drawerOpen: false,
	edit: false,
	settings: {
		disablePersistentDrawer: JSON.parse(localStorage.getItem('settings-disablePersistentDrawer')) || false,
		darkTheme: JSON.parse(localStorage.getItem('settings-darkTheme')) || false,
		sortNotes: localStorage.getItem('settings-sortNotes') || 'date-asc',
		sortNotesFavourite: JSON.parse(localStorage.getItem('settings-sortNotesFavourite')) || false,
		sortFolders: localStorage.getItem('settings-sortFolders') || 'name-asc',
		sortFoldersDisable: JSON.parse(localStorage.getItem('settings-sortFoldersDisable')) || false,
	},
	updateAvailable: false,
	untitledFolder: 'Unsorted Notes',
};

export const reducer = (state, action) => {
	const [location, name] = action.type.split('-');

	if (location === 'settings') {
		const value = action.value !== undefined ? action.value : !state.settings[name];

		localStorage.setItem(action.type, value);

		return {
			...state,
			settings: {
				...state.settings,
				[name]: value,
			},
		};
	}

	return {
		...state,
		[name]: action.value !== undefined ? action.value : !state[name],
	};
};

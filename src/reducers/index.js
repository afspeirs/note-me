export const initialState = {
	drawerOpen: false,
	edit: false,
	settings: {
		disablePersistentDrawer: JSON.parse(localStorage.getItem('settings-disablePersistentDrawer')) || false,
		darkTheme: JSON.parse(localStorage.getItem('settings-darkTheme')) || false,
		sort: localStorage.getItem('settings-sort') || 'date-asc',
		sortFavourite: JSON.parse(localStorage.getItem('settings-sortFavourite')) || false,
		sortFolders: localStorage.getItem('settings-sortFolders') || 'name-asc',
		sortFoldersDisable: JSON.parse(localStorage.getItem('settings-sortFoldersDisable')) || false,
	},
	updateAvailable: false,
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

export const initialState = {
	drawerOpen: false,
	edit: false,
	settings: {
		darkTheme: JSON.parse(localStorage.getItem('settings-darkTheme')) || false,
		sort: localStorage.getItem('settings-sort') || 'date-asc',
		sortFavourite: JSON.parse(localStorage.getItem('settings-sortFavourite')) || false,
	},
	updateAvailable: false,
};

export const reducer = (state, action) => {
	if (action.type.startsWith('settings-')) localStorage.setItem(action.type, action.value);

	switch (action.type) {
		case 'app-drawerOpen':
			return {
				...state,
				drawerOpen: action.value,
			};
		case 'app-edit':
			return {
				...state,
				edit: action.value,
			};
		case 'app-updateAvailable':
			return {
				...state,
				updateAvailable: action.value,
			};
		case 'settings-darkTheme':
			return {
				...state,
				settings: {
					...state.settings,
					darkTheme: action.value,
				},
			};
		case 'settings-sort':
			return {
				...state,
				settings: {
					...state.settings,
					sort: action.value,
				},
			};
		case 'settings-sortFavourite':
			return {
				...state,
				settings: {
					...state.settings,
					sortFavourite: action.value,
				},
			};
		default:
			return state;
	}
};

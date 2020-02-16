export const initialState = {
	settings: {
		sort: localStorage.getItem('changeSort') || 'date-asc',
		sortFavourite: JSON.parse(localStorage.getItem('changeSortFavourite')) || false,
		darkTheme: JSON.parse(localStorage.getItem('changeDarkTheme')) || false,
	},
};

export const reducer = (state, action) => {
	localStorage.setItem(action.type, action.value);
	switch (action.type) {
		case 'settingsSort':
			return {
				...state,
				settings: {
					...state.settings,
					sort: action.value,
				},
			};
		case 'settingsSortFavourite':
			return {
				...state,
				settings: {
					...state.settings,
					sortFavourite: action.value,
				},
			};
		case 'settingsDarkTheme':
			return {
				...state,
				settings: {
					...state.settings,
					darkTheme: action.value,
				},
			};
		default:
			return state;
	}
};

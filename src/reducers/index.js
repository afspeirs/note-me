export const initialState = {
	settings: {
		sort: localStorage.getItem('settings-sort') || 'date-asc',
		sortFavourite: JSON.parse(localStorage.getItem('settings-sortFavourite')) || false,
		darkTheme: JSON.parse(localStorage.getItem('settings-darkTheme')) || false,
	},
};

export const reducer = (state, action) => {
	if (action.type.startsWith('settings-')) localStorage.setItem(action.type, action.value);

	switch (action.type) {
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
		case 'settings-darkTheme':
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

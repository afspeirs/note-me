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
	const [location, value] = action.type.split('-');

	if (location === 'settings') {
		localStorage.setItem(action.type, action.value);

		return {
			...state,
			settings: {
				...state.settings,
				[value]: action.value,
			},
		};
	}

	return {
		...state,
		[value]: action.value !== undefined ? action.value : !state[value],
	};
};

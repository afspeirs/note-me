export const initialState = {
	containerTitle: null,
	search: {
		show: false,
		text: '',
	},
	settings: {
		darkTheme: JSON.parse(localStorage.getItem('settings-darkTheme')) || false,
		sortNotes: localStorage.getItem('settings-sortNotes') || 'date-asc',
		sortNotesFavourite: JSON.parse(localStorage.getItem('settings-sortNotesFavourite')) || false,
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

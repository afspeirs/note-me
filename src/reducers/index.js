export const initialState = {
	sort: localStorage.getItem('changeSort') || 'date-asc',
	sortFavourite: JSON.parse(localStorage.getItem('changeSortFavourite')) || false,
	darkTheme: JSON.parse(localStorage.getItem('changeDarkTheme')) || false,
};

export const reducer = (state, action) => {
	localStorage.setItem(action.type, action.value);
	switch (action.type) {
		case 'changeSort':
			return {
				...state,
				sort: action.value,
			};
		case 'changeSortFavourite':
			return {
				...state,
				sortFavourite: action.value,
			};
		case 'changeDarkTheme':
			return {
				...state,
				darkTheme: action.value,
			};
		default:
			return state;
	}
};

const reducer = (state, action) => {
	const [location, name] = action.type.split('-');

	if (location === 'settings') {
		const value = action.value || !state[location][name];

		localStorage.setItem(action.type, JSON.stringify(value));

		return {
			...state,
			[location]: {
				...state[location],
				[name]: value,
			},
		};
	}

	return {
		...state,
		[name]: action.value || !state[name],
	};
};

export default reducer;

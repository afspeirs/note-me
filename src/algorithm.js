/**
 * Initialises the algorithm to find the best route between the user's selected rides
 * @param {object} areas Object of Area Names containing the adjacent areas
 * @param {string[]} avoidAreas Array of Areas to avoid
 */
const Algorithm = (areas, avoidAreas) => {
	/**
	 * Returns a list of the visable areas
	 *
	 * @param {string} areaName
	 * @returns {string[]} visibleAreas
	 */
	function findVisibleAreas(areaName) {
		const visibleAreas = areas[areaName].adjacent
			.filter(item => avoidAreas.indexOf(item[2]) < 0)
			.map(area => area[0]);

		return visibleAreas;
	}

	/**
	 * Remove redundent looping
	 *
	 * @param {string} route
	 */
	function removeLoops(route) {
		/** @type {number} */
		let i;

		// if the visible areas of route[i] are in position [i+1] and [i+2] then remove [i+1]
		for (i = 0; i <= route.length - 3; i++) {
			const tempVisibleAreas = [findVisibleAreas(route[i])];
			// console.table(tempVisibleAreas);

			if (tempVisibleAreas.includes(route[i + 1]) === true) {
				if (tempVisibleAreas.includes(route[i + 2]) === true) {
					route.splice(route[i + 1], 1);
				}
			}
			// console.table(tempVisibleAreas);
		}
	}

	/**
	 * Return the best route from the startArea to the destinationArea
	 *
	 * @param {string} startArea
	 * @param {string} destinationArea
	 * @returns {string[]} bestroute
	 */
	function returnRouteToSelectedArea(startArea, destinationArea) {
		/**
		 * Adds an initial route, with a starting area
		 * @type {string[][]}
		 *
		 */
		const possibleRoutes = [[startArea]];
		/** @type {?string[][]} */
		let bestRoute = null;
		/** @type {number} */
		let a;
		let b;

		// While there are possble routes
		while (possibleRoutes.length !== 0) {
			for (a = 0; a <= possibleRoutes.length - 1; a++) {
				/**
				 * The current area to check
				 * @type {string}
				 */
				const currentArea = possibleRoutes[a][possibleRoutes[a].length - 1];

				// check if current area is one of the selected areas and adds to a list
				if (destinationArea === currentArea) {
					bestRoute = possibleRoutes[a];
					break;
				}

				/**
				 * A list of the visible areas from the current area
				 * @type {string[]}
				 */
				const visibleAreas = findVisibleAreas(currentArea);

				// for each of the visible areas
				for (b = 0; b <= visibleAreas.length - 1; b++) {
					// if current route does not already contain the visible area
					if (!possibleRoutes[a].includes(visibleAreas[b])) {
						/**
						 * A list of the possibleRoute wuih a visible area concatintaed on the end
						 * @type {string[]}
						 */
						const newRoute = possibleRoutes[a].concat(visibleAreas[b]);

						// add newRoute to the list of possible areas
						possibleRoutes.push(newRoute);
					}
				}
			}
			if (bestRoute !== null) {
				removeLoops(bestRoute);
			}
			// Breaks when bestRoute != null
			break;
		}
		// console.table(possibleRoutes);
		return bestRoute;
	}

	/**
	 * Sorts an array by the first value
	 */
	function sortFunction(a, b) {
		if (a[0] === b[0]) {
			return 0;
		}
		return a[0] > b[0] ? -1 : 1;
	}

	/**
	 * Returns the route that contains the most selected areas
	 *
	 * @param {string[][]} listOfRoutes
	 * @param {string[]} selectedAreas
	 * @returns {string[][]} numberOfSelectedAreas
	 */
	function returnRouteWithMostSelectedAreas(listOfRoutes, selectedAreas) {
		/**
		 * Stores the routes that contain selectedAreas
		 * @type {string[][]}
		 */
		const numberOfSelectedAreas = [];
		/** @type {number} */
		let i;
		let j;

		for (i = 0; i <= listOfRoutes.length - 1; i++) {
			/**
			 * Contains the number of areas found in the listOfRoutes
			 * @type {number}
			 */
			let areaCount = 0;

			// check for multiple selected areas in each route
			for (j = 0; j <= selectedAreas.length - 1; j++) {
				if (listOfRoutes[i].includes(selectedAreas[j]) === true) {
					areaCount = areaCount === 0 ? 1 : areaCount++;
				}
			}

			if (areaCount >= 1) {
				numberOfSelectedAreas.push([areaCount, listOfRoutes[i]]);
			}
		}
		numberOfSelectedAreas.sort(sortFunction);

		// console.log(numberOfSelectedAreas);
		return numberOfSelectedAreas[0][1];
	}

	/**
	 * Returns the unfound areas based on the users selected areas
	 *
	 * @param {string[][]} routeWithMostSelectedAreas
	 * @param {string[]} selectedAreas
	 * @returns {string[]} selectedAreas
	 */
	function returnUnfoundAreas(routeWithMostSelectedAreas, selectedAreas) {
		/** @type {number} */
		let i;

		for (i = 0; i <= routeWithMostSelectedAreas.length - 1; i++) {
			if (selectedAreas.indexOf(routeWithMostSelectedAreas[i]) !== -1) {
				selectedAreas.splice(selectedAreas.indexOf(routeWithMostSelectedAreas[i]), 1);
			}
		}

		return selectedAreas;
	}

	/**
	 * Returns the best tour using unfoundAreas
	 * @todo Verify the best route at the end
	 *
	 * @param {string[]} routeWithMostSelectedAreas
	 * @param {string[]} unfoundAreas
	 * @returns {string[]} bestRoute
	 */
	function returnBestTour(routeWithMostSelectedAreas, unfoundAreas) {
		/** @type {number} */
		let i;
		let j;

		for (i = 0; i <= unfoundAreas.length - 1; i++) {
			/**
			 * Array of the visible areas from the unfound area
			 * @type {string[][]}
			 */
			const unfoundVisibleAreas = findVisibleAreas(unfoundAreas[i]);

			// console.log(`unfoundarea: ${unfoundAreas[i]}`);

			// for each visible area from the unfound area
			for (j = 0; j <= unfoundVisibleAreas.length - 1; j++) {
				// console.log(`routeWithMostSelectedAreas: ${routeWithMostSelectedAreas}`);
				// console.log(`unfoundVisibleArea[${j}]: ${unfoundVisibleAreas[j]}`);

				// the unfound area is adjecent to one of the areas in the route
				if (routeWithMostSelectedAreas.includes(unfoundVisibleAreas[j]) && !routeWithMostSelectedAreas.includes(unfoundAreas[i])) {
					// console.log(routeWithMostSelectedAreas[routeWithMostSelectedAreas.indexOf(unfoundVisibleAreas[j])]);

					if (routeWithMostSelectedAreas.indexOf(unfoundVisibleAreas[j]) === routeWithMostSelectedAreas.length - 1) {
						// if visible area is last
						// console.log('adjacent and last');
						routeWithMostSelectedAreas.splice(routeWithMostSelectedAreas.indexOf(unfoundVisibleAreas[j]) + 1, 0, unfoundAreas[i]);
					} else if (routeWithMostSelectedAreas.indexOf(unfoundVisibleAreas[j]) !== routeWithMostSelectedAreas.length - 1) {
						// if visible area is not last in the list
						// console.log('adjacent and not last');
						routeWithMostSelectedAreas.splice(routeWithMostSelectedAreas.indexOf(unfoundVisibleAreas[j]) + 1, 0, unfoundAreas[i]); // Add unfound area

						if (unfoundVisibleAreas[j + 1] && unfoundVisibleAreas.includes(routeWithMostSelectedAreas[routeWithMostSelectedAreas.indexOf(unfoundVisibleAreas[j + 1])])) {
							break;
						} else {
							routeWithMostSelectedAreas.splice(routeWithMostSelectedAreas.indexOf(unfoundAreas[i]) + 1, 0, unfoundVisibleAreas[j]); // added connecting area again
						}
					} else {
						console.log('error'); /* eslint-disable-line no-console */ // Shouldnt ever happen
					}
				} else if (j === unfoundVisibleAreas.length - 1 && !routeWithMostSelectedAreas.includes(unfoundAreas[i])) {
					// the unfound area is not adjecent to one of the areas in the route && is the last one
					// TODO - Shorten this
					// console.log('not adjacent');
					const lastInRoute = routeWithMostSelectedAreas[routeWithMostSelectedAreas.length - 1];
					routeWithMostSelectedAreas.splice(-1, 1); // remove last in item
					routeWithMostSelectedAreas.push(...returnRouteToSelectedArea(lastInRoute, unfoundAreas[i]));
				}
			}
		}

		// Removes unnecessary loops
		// removeLoops(routeWithMostSelectedAreas); // temporarily comment out
		// console.log(routeWithMostSelectedAreas);
		return routeWithMostSelectedAreas;
	}

	return {
		findVisibleAreas,
		returnRouteToSelectedArea,
		returnRouteWithMostSelectedAreas,
		returnUnfoundAreas,
		returnBestTour,
	};
};

export default Algorithm;

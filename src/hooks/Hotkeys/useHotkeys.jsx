import { useEffect } from 'react';

const useHotkeys = (inputHotkeys, options) => {
	const isArray = Array.isArray(inputHotkeys);

	const runCode = (event, hotkey) => {
		const {
			callback,
			keys,
			metaModifier,
		} = hotkey;
		if (metaModifier && (event.ctrlKey || event.metaKey) && keys.includes(event.key)) {
			callback(event);
		} else if (!metaModifier && keys.includes(event.key)) {
			callback(event);
		}
	};

	const handleKeyDown = (event) => {
		if (options?.debug) console.log(event); // eslint-disable-line no-console

		if (isArray) {
			inputHotkeys.forEach((hotkey) => runCode(event, hotkey));
		} else {
			runCode(event, inputHotkeys);
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, []); // eslint-disable-line
};
// const useHotkeys = ({
// 	callback,
// 	debug,
// 	keys,
// 	metaModifier,
// }) => {
// 	const handleKeyDown = (event) => {
// 		if (debug) console.log(event); // eslint-disable-line no-console
// 		if (metaModifier && (event.ctrlKey || event.metaKey) && keys.includes(event.key)) {
// 			callback(event);
// 		} else if (!metaModifier && keys.includes(event.key)) {
// 			callback(event);
// 		}
// 	};

// 	useEffect(() => {
// 		window.addEventListener('keydown', handleKeyDown);
// 		return () => window.removeEventListener('keydown', handleKeyDown);
// 	}, []); // eslint-disable-line
// };

export default useHotkeys;

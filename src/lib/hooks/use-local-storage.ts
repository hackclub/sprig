import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

/** React hook for localStorage
 * From https://usehooks.com/useLocalStorage/
 */
export default function useLocalStorage<T>(
	key: string,
	initialValue: T
): [T, (x: T) => void] {
	// State to store our value
	// Pass initial state function to useState so logic is only executed once
	const storedValue = useSignal<T>(initialValue);

	useEffect(() => {
		try {
			// Get from local storage by key
			const item = window.localStorage.getItem(key);
			// Parse stored json or if none return initialValue
			storedValue.value = item ? JSON.parse(item) : initialValue;
		} catch (error) {
			// If error also return initialValue
			console.log(error);
			storedValue.value = initialValue;
		}
	}, [key, initialValue]);

	// Return a wrapped version of useState's setter function that ...
	// ... persists the new value to localStorage.
	const setValue = (value: T): void => {
		try {
			// Allow value to be a function so we have same API as useState
			const valueToStore =
				value instanceof Function ? value(storedValue) : value;
			// Save state
			storedValue.value = valueToStore;
			// Save to local storage
			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			// A more advanced implementation would handle the error case
			console.log(error);
		}
	};

	return [storedValue.value, setValue];
}

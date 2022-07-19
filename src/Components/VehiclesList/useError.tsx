import {useCallback, useRef, useState} from "react";

export function useError(): [string, (value: string) => void, VoidFunction] {
	const [error, setError] = useState('');
	const timeoutHandler = useRef<number>();

	const setErrorWithTimeout = useCallback((value: string) => {
		setError(value);

		window.clearTimeout(timeoutHandler.current);
		timeoutHandler.current = window.setTimeout(() => {
			setError('');
		}, 2000)
	}, []);

	const clearError = useCallback(() => {
		setError('');
		window.clearTimeout(timeoutHandler.current);
	}, []);

	return [error, setErrorWithTimeout, clearError];
}
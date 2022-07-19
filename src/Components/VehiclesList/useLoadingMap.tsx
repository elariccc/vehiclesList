import {useCallback, useState} from "react";
import {LOADING_DURATION, LoadingMapByTypeId, TICK_DURATION} from "./Types";

export function useLoadingMap(): [LoadingMapByTypeId, (vehicleType: string, id: string, callback: VoidFunction) => void] {
	const [loadingMap, setLoadingMap] = useState<LoadingMapByTypeId>(new Map());

	const startLoading = useCallback((vehicleType: string, id: string, callback: VoidFunction) => {
		const typeId = vehicleType + id;
		let callbackWithOldCallbacks = callback;

		const oldLoading = loadingMap.get(typeId);
		if (oldLoading) {
			window.clearTimeout(oldLoading.timeoutHandler);
			window.clearInterval(oldLoading.intervalHandler);
			callbackWithOldCallbacks = () => {
				oldLoading.callback();
				callback();
			}
		}

		const timeoutHandler = window.setTimeout(() => {
			setLoadingMap(oldLoadingMap => {
				const oldLoading = oldLoadingMap.get(typeId);

				if (oldLoading) {
					oldLoading.callback();
					window.clearInterval(oldLoading.intervalHandler);
				}

				const newLoadingMap = new Map(oldLoadingMap);
				newLoadingMap.delete(typeId);
				return newLoadingMap;
			});
		}, LOADING_DURATION);

		const intervalHandler = window.setInterval(() => {
			setLoadingMap(oldLoadingMap => {
				const newLoadingMap = new Map(oldLoadingMap);
				const oldLoading = oldLoadingMap.get(typeId);

				if (oldLoading) {
					newLoadingMap.set(typeId, {...oldLoading, timePassed: performance.now() - oldLoading.startTime});
				} else {
					window.clearInterval(intervalHandler);
				}

				return newLoadingMap;
			});
		}, TICK_DURATION);

		const newLoadingMap = new Map(loadingMap);
		newLoadingMap.set(typeId, {
			timeoutHandler,
			intervalHandler,
			timePassed: 0,
			startTime: performance.now(),
			callback: callbackWithOldCallbacks
		});
		setLoadingMap(newLoadingMap);
	}, [loadingMap]);

	return [loadingMap, startLoading];
}
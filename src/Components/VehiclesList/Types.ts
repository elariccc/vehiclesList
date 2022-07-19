export interface Vehicle {
	id: number;
	type: VehicleType;
	createdAt: string;
	model: Record<string, string | number>
}

export type VehicleType = 'car' | 'truck';
export const ALL_VEHICLE_TYPES: VehicleType[] = ['car', 'truck'];

interface Loading {
	timeoutHandler: number;
	intervalHandler: number;
	startTime: number;
	timePassed: number;
	callback: VoidFunction;
}

export const LOADING_DURATION = 3000;
export const TICK_DURATION = 100;
export type LoadingMapByTypeId = Map<string, Loading>
import {Vehicle} from "./Components/VehiclesList/Types";

export const vehiclesInitData: Vehicle[] = [
	{
		"id": 1,
		"type": "car",
		"createdAt": "2022-01-01 00:00:00",
		"model": {
			"seats": 2,
			"doors": 3,
		},
	},
	{
		"id": 2,
		"type": "truck",
		"createdAt": "2021-01-01 00:00:00",
		"model": {
			"wheelDrive": "8x8",
			"ecoClass": "3",
		},
	}
];
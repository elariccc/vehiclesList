import {memo, useCallback, useState} from "react";
import {vehiclesInitData} from "../../vehiclesInitData";
import {VehicleItem} from "./VehicleItem";
import {ALL_VEHICLE_TYPES, LOADING_DURATION, Vehicle, VehicleType} from "./Types";
import {useError} from "./useError";
import {useLoadingMap} from "./useLoadingMap";
import './VehiclesList.css';

export const VehiclesList = memo(VehiclesListInner);

export function VehiclesListInner() {
	const [vehicles, setVehicles] = useState<Vehicle[]>(vehiclesInitData);
	const [editValue, setEditValue] = useState('');
	const [error, setError, clearError] = useError();
	const [loadingMap, startLoading] = useLoadingMap();

	const onAcceptClick = useCallback(() => {
		const editValueParts = editValue.split(':');

		if (editValueParts.length !== 4) return setError('Неверный формат ввода');

		const [type, id, modelKey, value] = editValueParts;

		if (!ALL_VEHICLE_TYPES.includes(type as VehicleType)) return setError('Неверный Type');

		const vehicleIndex = vehicles.findIndex(vehicle => vehicle.type === type && vehicle.id === +id);
		if (vehicleIndex === -1) return setError('Машины с этим Id не найдено');

		clearError();

		startLoading(type, id, () => {
			setVehicles(oldVehicles => {
				const newVehicles = [...oldVehicles];
				const oldVehicle = newVehicles[vehicleIndex]

				newVehicles[vehicleIndex] = {...oldVehicle, model: {...oldVehicle.model, [modelKey]: value}};
				return newVehicles;
			});
		});
	}, [editValue, clearError, setError, vehicles, startLoading])

	return <div className={'vehicle-list'}>
		<div className={'edit-panel'}>
			<div className={'edit-input'}>
				<input
					value={editValue}
					onChange={e => setEditValue(e.currentTarget.value)}
				/>
				<div className={'edit-input--description' + (error ? ' edit-input--description__wrong' : '')}>
					{error || 'Введите значение в формате Type:Id:ModelKey:Value'}
				</div>
			</div>
			<button onClick={onAcceptClick}>
				Применить
			</button>
		</div>
		{vehicles.map(vehicle =>
			<VehicleItem
				key={vehicle.type}
				vehicle={vehicle}
				loadingPercent={(loadingMap.get(vehicle.type + vehicle.id)?.timePassed || 0) / LOADING_DURATION * 100}
			/>
		)}
	</div>;
}


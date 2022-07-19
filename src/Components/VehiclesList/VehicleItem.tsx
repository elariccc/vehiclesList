import {Vehicle, VehicleType} from "./Types";
import {memo} from "react";
import "./VehiclesList.css";

interface VehicleItemProps {
	vehicle: Vehicle
	loadingPercent: number;
}

export const VehicleItem = memo(VehicleItemInner);

function VehicleItemInner({vehicle, loadingPercent}: VehicleItemProps) {
	return <div className={'vehicle-item'}>
		<div className={'vehicle-item__card'}>
			<div>{`${getVehicleIcon(vehicle.type)}, id: ${vehicle.id}, created at: ${vehicle.createdAt}`}</div>
			<ul>
				{Object.keys(vehicle.model).map(key =>
					<li key={key}>
						{`${key}: ${vehicle.model[key]}`}
					</li>
				)}
			</ul>
		</div>
		{!!loadingPercent &&
			<div className={'vehicle-item__percent'}>
				{loadingPercent.toFixed(2)}%
			</div>
		}
	</div>;
}

function getVehicleIcon(type: VehicleType) {
	switch (type) {
		case "car":
			return '🚙';
		case "truck":
			return '🚚';
	}
}
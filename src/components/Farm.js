import React from 'react';
import FarmOfClub from './FarmOfClub';
import Draggable from 'react-draggable';
import useFarm from '../hooks/useFarm';
import ManageFarmPopUp from '../components/ManageFarmPopUp';
import './Farm.css';

function Farm({ data, showManageFarmPopUp, setShowManageFarmPopUp }) {
	// console.log(data.farmType);
	const [
		farmData, //include id, farmName, farmType, members, chunks, plants
		friends, // this user's friends
		getFarmLoading,
		leaveFarm,
		createNewPlant,
		addNewMember,
	] = useFarm(data.id);

	switch (data.farmType) {
		case 'Club':
			return (
				<>
					<ManageFarmPopUp
						show={showManageFarmPopUp}
						setShow={setShowManageFarmPopUp}
					/>
					<FarmOfClub data={farmData} loading={getFarmLoading} />
				</>
			);
		case 'Timeline':
		//TODO
	}
}

export default Farm;

import React, { useEffect, useState } from 'react';
//import { getFarmList } from '../axios';

const Farms = ({userData}) => {
	const [haveFarm, setHaveFarm] = useState(false);
	const [farmList, setFarmList] = useState([]);
	const [friendList, setFriendList] = useState([]);

	
	useEffect(()=>{
		// if(!haveFarm){
		// 	setFarmList(getFarmList(userData.name));
		//  setHaveFarm(true);
		// }
	})
	
	return (
		<>
			<div className='farms'>
				<h1>{userData.name}'s Farms</h1>
			</div>
			
		</>
	);
}

export default Farms;

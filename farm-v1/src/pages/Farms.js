import React, { useEffect, useState } from 'react';
//import { getFarm } from '../axios';

const Farms = ({userData}) => {
	const [farm, setFarm] = useState([]);

	useEffect(()=>{
		// if(!farm.length){
		// 	setFarm(getFarm(userData.name));
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

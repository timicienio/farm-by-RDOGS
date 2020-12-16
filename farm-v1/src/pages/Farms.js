import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//import { getFarmList } from '../axios';

const Farms = ({userData}) => {
	const [haveFarm, setHaveFarm] = useState(false);
	//const [farmList, setFarmList] = useState([]);
	const [friendList, setFriendList] = useState([]);
	const [farmList, setFarmList] = useState([
		{farmname: 'rdogsFarm1'},
		{farmname: 'rdogsFarm2'}
	]);
	
	useEffect(()=>{
		if(!haveFarm){
			//setFarmList(getFarmList(userData.name));
			setHaveFarm(true);
		}
	})
	
	return (
		<>
			<div className='farms'>
				<h1>{userData.name}'s Farms</h1>
			</div>
			{
				farmList.map((farm, key) => {
					return (
						<div>
							<Link to={"/farms/"+ farm.farmname}>{farm.farmname}</Link>				
						</div>
					)
				})
			}
			
		</>
	);
}

export default Farms;

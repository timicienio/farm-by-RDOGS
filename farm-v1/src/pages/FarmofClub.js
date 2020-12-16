import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getFarm } from '../axios';

const FarmofClub = ({userData}) => {
	const [farm, setFarm] = useState([]);
	const {farmname} = useParams();
	
	useEffect(()=>{
		if(farm.length){
			//setFarm(getFarm);
		}
	})

	return (
		<>
			<div className='farms'>
				<h1>{farmname}</h1>
			</div>
			<Link to ="/farms">Go Back to Farm List</Link>

		</>
	);
}

export default FarmofClub;

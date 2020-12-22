import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getFarm } from '../axios';

const FarmOfClub = ({ userData }) => {
	const [farm, setFarm] = useState([]);
	const { farmName } = useParams();

	useEffect(() => {
		if (farm.length) {
			//setFarm(getFarm);
		}
	});

	return (
		<>
			<div className='farms'>
				<h1>{farmName}</h1>
			</div>
			<Link to='/farms'>Go Back to Farm List</Link>
		</>
	);
};

export default FarmOfClub;

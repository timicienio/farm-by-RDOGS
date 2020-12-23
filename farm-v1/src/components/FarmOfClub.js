import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getFarm } from '../axios';

function FarmOfClub({ data }) {
	const [farm, setFarm] = useState([]);
	const { farmName } = useParams();

	// console.log('rendering a club farm');

	return (
		<>
			<div className='farm'>
				<h1>club</h1>
			</div>
		</>
	);
}

export default FarmOfClub;

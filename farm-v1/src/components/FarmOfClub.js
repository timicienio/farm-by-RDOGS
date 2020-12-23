import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getFarm } from '../axios';
import Draggable from 'react-draggable';
import './Farm.css';

function FarmOfClub({ data }) {
	const [farm, setFarm] = useState([]);
	const { farmName } = useParams();

	// console.log('rendering a club farm');

	return (
		<>
			<Draggable
				axis='both'
				defaultPosition={{ x: 0, y: 0 }}
				position={null}
			>
				<div className='farm'>
					<h1>{data.farmName}</h1>
				</div>
			</Draggable>
		</>
	);
}

export default FarmOfClub;

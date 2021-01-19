import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Draggable from 'react-draggable';
import useFarm from '../hooks/useFarm';
import Chunk from './Chunk';
import './Farm.css';
import Spinner from 'react-bootstrap/Spinner';

function FarmOfClub({ data, selectedTool, selectedPlant }) {
	const [
		farmData, //include id, farmName, farmType, members, chunks, plants
		friends, // this user's friends
		getFarmLoading,
		leaveFarm,
		createNewPlant,
		addNewMember,
	] = useFarm(data.id);

	console.log(farmData);

	return getFarmLoading ? (
		<Spinner animation='grow' id='farm-loading-spinner' />
	) : (
		<>
			<Draggable
				axis='both'
				defaultPosition={{ x: 0, y: 0 }}
				position={null}
			>
				<div className='farm'>
					{farmData.getFarm.chunks.map(item => (
						<Chunk data={item} modifier={{}} />
					))}
				</div>
			</Draggable>
		</>
	);
}

export default FarmOfClub;

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getFarm } from '../axios';
import Draggable from 'react-draggable';
import useFarm from '../hooks/useFarm';
import Chunk from './Chunk';
import './Farm.css';

function FarmOfClub({ data }) {
	const [
		farmName,
		type,
		members,
		chunks,
		setFarmName,
		setType,
		addMember,
		modifyMember,
		removeMember,
		addChunk,
		modifyChunk,
	] = useFarm(data);

	// console.log('rendering a club farm');

	return (
		<>
			<Draggable
				axis='both'
				defaultPosition={{ x: 0, y: 0 }}
				position={null}
			>
				<div className='farm'>
					{chunks.map(item => (
						<Chunk data={item} modifier={modifyChunk} />
					))}
				</div>
			</Draggable>
		</>
	);
}

export default FarmOfClub;

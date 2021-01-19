import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Draggable from 'react-draggable';

import Chunk from './Chunk';
import './Farm.css';
import { Modal, Spinner } from 'react-bootstrap';

function FarmOfClub({
	data,
	loading,
	selectedTool,
	selectedPlant,
	handleChunkCellClicked,
}) {
	console.log(data);

	return loading ? (
		<Spinner animation='grow' id='farm-loading-spinner' />
	) : (
		<>
			<Draggable
				axis='both'
				defaultPosition={{ x: 0, y: 0 }}
				position={null}
			>
				<div className='farm'>
					{data.getFarm.chunks.map(chunk => (
						<Chunk
							plants={data.getFarm.plants.filter(
								plant =>
									plant.chunkCoordinates === chunk.coordinates
							)}
							handleCellClicked={cellCoordinates => {
								handleChunkCellClicked({
									chunkCoordinates: chunk.coordinates,
									cellCoordinates: cellCoordinates,
								});
							}}
							created
						/>
					))}
				</div>
			</Draggable>
		</>
	);
}

export default FarmOfClub;

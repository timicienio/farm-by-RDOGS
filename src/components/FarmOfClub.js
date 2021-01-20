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
	handleChunkCellHover,
	handleChunkCellHoverOut,
	handlePlantClicked,
	handlePlantHover,
	showPositionCue,
	setShowPositionCue,
	positionCueValidity,
	positionCueType,
	movePlantId,
}) {
	// console.log(selectedTool);

	return loading ? (
		<Spinner animation='grow' id='farm-loading-spinner' />
	) : (
		<>
			<Draggable
				axis='both'
				defaultPosition={{ x: 0, y: 0 }}
				position={null}
				disabled={selectedTool !== 'DRAG'}
			>
				<div className='farm'>
					{data.getFarm.chunks.map(chunk => (
						<Chunk
							plants={data.getFarm.plants.filter(
								plant =>
									plant.chunkCoordinates.x ===
										chunk.coordinates.x &&
									plant.chunkCoordinates.y ===
										chunk.coordinates.y
							)}
							handleCellClicked={cellCoordinates => {
								handleChunkCellClicked({
									chunkCoordinates: chunk.coordinates,
									cellCoordinates: cellCoordinates,
								});
							}}
							handleCellHover={cellCoordinates => {
								handleChunkCellHover({
									chunkCoordinates: chunk.coordinates,
									cellCoordinates: cellCoordinates,
								});
							}}
							handleCellHoverOut={() => {}}
							handlePlantClicked={handlePlantClicked}
							handlePlantHover={handlePlantHover}
							showPositionCue={showPositionCue}
							positionCueValidity={positionCueValidity}
							positionCueType={positionCueType}
							movePlantId={movePlantId}
							created
						/>
					))}
				</div>
			</Draggable>
		</>
	);
}

export default FarmOfClub;

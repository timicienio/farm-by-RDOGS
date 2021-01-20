import React, { useState } from 'react';
import useChunk from '../hooks/useChunk';
import Cell from './Cell';
import Post from './Plants/Post';
import Comment from './Plants/Comment';
import Reaction from './Plants/Reaction';
import PositionCue from './Plants/PositionCue';

function Chunk({
	plants,
	created,
	handleCellClicked,
	handleCellHover,
	handleCellHoverOut,
	handlePlantClicked,
	handlePlantHover,
	showPositionCue,
	positionCueValidity,
	positionCueType,
	movePlantId,
}) {
	const [hoveringCellCoordinates, setHoveringCellCoordinates] = useState({});
	const grid = new Array(32).fill(new Array(32).fill());
	// console.log(positionCueType);

	return (
		<div className={'chunk ' + (created ? '' : 'not-created')}>
			{grid.map((_, j) => (
				<div className='cell-row'>
					{grid.map((_, i) => (
						<Cell
							coor={{ x: i, y: j }}
							onClick={() => handleCellClicked({ x: i, y: j })}
							onHover={() => {
								handleCellHover({ x: i, y: j });
								setHoveringCellCoordinates({ x: i, y: j });
							}}
							onLeave={() => handleCellHoverOut()}
						/>
					))}
				</div>
			))}
			{showPositionCue ? (
				<PositionCue
					coordinates={hoveringCellCoordinates}
					validity={positionCueValidity}
					type={positionCueType}
				/>
			) : (
				<></>
			)}
			{plants.map((plant, i) => {
				switch (plant.plantType) {
					case 'Post':
						return (
							<Post
								coordinates={plant.plantCoordinates}
								title={plant.title}
								body={plant.body}
								author={plant.author}
								onClick={() => {
									handlePlantClicked(i);
								}}
								onHover={() => handlePlantHover(i)}
								moving={plant.id === movePlantId}
							></Post>
						);

					case 'Comment':
						return (
							<Comment
								coordinates={plant.plantCoordinates}
								// title={plant.title}
								body={plant.body}
								author={plant.author}
								onClick={() => handlePlantClicked(i)}
								onHover={() => handlePlantHover(i)}
								moving={plant.id === movePlantId}
							></Comment>
						);

					case 'Reaction':
						return (
							<Reaction
								coordinates={plant.plantCoordinates}
								// title={plant.title}
								body={plant.body}
								author={plant.author}
								onClick={() => handlePlantClicked(i)}
								onHover={() => handlePlantHover(i)}
								moving={plant.id === movePlantId}
							></Reaction>
						);
				}
			})}
		</div>
	);
}

export default Chunk;

import React, { useEffect } from 'react';
import useChunk from '../hooks/useChunk';
import Cell from './Cell';
import Post from './Plants/Post';

function Chunk({ plants, created, handleCellClicked }) {
	const grid = new Array(32).fill(new Array(32).fill({ type: 'Empty' }));

	return (
		<div className={'chunk ' + (created ? '' : 'not-created')}>
			{grid.map((_, j) => (
				<div className='cell-row'>
					{grid.map((_, i) => (
						<Cell
							coor={{ x: i, y: j }}
							onClick={() => handleCellClicked({ x: i, y: j })}
						/>
					))}
				</div>
			))}
			{plants.map(plant => {
				switch (plant.plantType) {
					case 'Post':
						return (
							<Post
								coordinates={plant.plantCoordinates}
								title={plant.title}
								body={plant.body}
								author={plant.author}
							></Post>
						);
				}
			})}
		</div>
	);
}

export default Chunk;

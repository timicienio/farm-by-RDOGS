import React from 'react';
import useChunk from '../hooks/useChunk';
import Cell from './Cell';

function Chunk({ data, modifier }) {
	const [{ plants }, addPlant, modifyPlant, created, setCreated] = useChunk(
		data,
		modifier
	);
	let item;
	const grid = new Array(64).fill(0);
	console.log(grid);

	return (
		<div className={'chunk ' + (created ? '' : 'not-created')}>
			{grid.map(y => (
				<div className='cell-row'>
					{grid.map(x => (
						<Cell
							coor={{ x: x, y: y }}
							onClick={() => console.log('clicked')}
						/>
					))}
				</div>
			))}
		</div>
	);
}

export default Chunk;

import React, { useEffect } from 'react';
import useChunk from '../hooks/useChunk';
import Cell from './Cell';

function Chunk({ plants, created, handleCellClicked }) {
	const grid = new Array(32).fill(new Array(32).fill({ type: 'Empty' }));

	return (
		<div className={'chunk ' + (created ? '' : 'not-created')}>
			{grid.map((y, j) => (
				<div className='cell-row'>
					{grid.map((x, i) => (
						<Cell
							coor={{ x: i, y: j }}
							onClick={() => handleCellClicked({ x: i, y: j })}
						/>
					))}
				</div>
			))}
		</div>
	);
}

export default Chunk;

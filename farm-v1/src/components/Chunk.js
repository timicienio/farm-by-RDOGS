import React, { useEffect } from 'react';
import useChunk from '../hooks/useChunk';
import Cell from './Cell';

function Chunk({ data, modifier }) {
	const [{ plants }, addPlant, modifyPlant, created, setCreated] = useChunk(
		data,
		modifier
	);

	const grid = new Array(32).fill(new Array(32).fill({ type: 'Empty' }));

	// useEffect(() => {
	// 	for (item in plants) {
	// 		switch (item.type){
	// 			case 'Post':

	// 		}
	// 	}

	// 	return () => {
	// 		cleanup;
	// 	};
	// }, [input]);

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

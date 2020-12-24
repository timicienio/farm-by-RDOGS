import React from 'react';

function Cell({ coor, onClick }) {
	return <div className='cell' onClick={() => onClick()}></div>;
}

export default Cell;

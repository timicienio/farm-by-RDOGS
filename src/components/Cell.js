import React from 'react';

function Cell({ onClick, onHover, onLeave }) {
	return (
		<div
			className='cell'
			onClick={() => onClick()}
			onMouseEnter={() => onHover()}
			onMouseOut={() => onLeave()}
		></div>
	);
}

export default Cell;

import React from 'react';

function Reaction({ body, coordinates }) {
	const style = {
		marginLeft: String(6 + 72 * coordinates.x) + 'px',
		marginTop: String(6 + 72 * coordinates.y) + 'px',
	};
	return (
		<div className='plant reaction' style={style}>
			<span role='img' aria-label='sheep'>
				{body}
			</span>
		</div>
	);
}

export default Reaction;

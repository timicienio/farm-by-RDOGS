import React from 'react';

function Reaction({ body, coordinates, moving }) {
	const style = {
		marginLeft: String(6 + 72 * coordinates.x) + 'px',
		marginTop: String(6 + 72 * coordinates.y) + 'px',
	};
	console.log(moving);
	return (
		<div
			className={'plant reaction' + (moving ? ' moving' : '')}
			style={style}
		>
			<span role='img' aria-label='sheep'>
				{body}
			</span>
		</div>
	);
}

export default Reaction;

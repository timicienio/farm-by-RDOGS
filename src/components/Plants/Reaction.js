import React from 'react';
import Emoji from 'react-emoji-render';

function Reaction({ body, coordinates, moving, onClick }) {
	const style = {
		marginLeft: String(6 + 72 * coordinates.x) + 'px',
		marginTop: String(6 + 72 * coordinates.y) + 'px',
	};
	console.log(moving);
	return (
		<div
			className={'plant reaction' + (moving ? ' moving' : '')}
			style={style}
			onClick={onClick}
		>
			<Emoji text={body} />
		</div>
	);
}

export default Reaction;

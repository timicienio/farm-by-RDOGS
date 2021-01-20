import React from 'react';

function PositionCue({ coordinates, type, validity }) {
	const style = {
		marginTop: String(6 + 72 * coordinates.y) + 'px',
		marginLeft: String(6 + 72 * coordinates.x) + 'px',
	};
	// console.log(validity, type);
	return (
		<div
			className={'plant ' + type + ' cue ' + (validity ? '' : 'invalid')}
			style={style}
		></div>
	);
}

export default PositionCue;

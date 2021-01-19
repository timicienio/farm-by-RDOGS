import React from 'react';

function Comment({ body, coordinates }) {
	const style = {
		marginTop: String(6 + 72 * coordinates.x) + 'px',
		marginLeft: String(6 + 72 * coordinates.y) + 'px',
	};
	return (
		<div className='plant comment' style={style}>
			<p className='comment-body'>{body}</p>
		</div>
	);
}

export default Comment;

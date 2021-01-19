import React from 'react';
import './Plant.css';

function Post({ title, body, coordinates }) {
	const style = {
		marginTop: String(6 + 72 * coordinates.x) + 'px',
		marginLeft: String(6 + 72 * coordinates.y) + 'px',
	};
	return (
		<div className='plant post' style={style}>
			<h1 className='post-title'>{title}</h1>
			<p className='post-body'>{body}</p>
		</div>
	);
}

export default Post;

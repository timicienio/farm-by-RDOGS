import React from 'react';

function Comment({ body, author, coordinates }) {
	const style = {
		marginLeft: String(6 + 72 * coordinates.x) + 'px',
		marginTop: String(6 + 72 * coordinates.y) + 'px',
	};
	return (
		<div className='plant comment' style={style}>
			<div className='author-container'>
				<h2 className='post-author'>{author}</h2>
			</div>
			<div className='comment-body-container'>
				<p className='post-body'>{body}</p>
			</div>
		</div>
	);
}

export default Comment;

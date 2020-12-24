import React from 'react';

function Comment(data) {
	return (
		<div className='plant comment'>
			<p className='comment-body'>{data.body}</p>
		</div>
	);
}

export default Comment;

import React from 'react';

function Post(data) {
	return (
		<div className='plant post'>
			<h1 className='post-title'>{data.title}</h1>
			<p className='post-body'>{data.body}</p>
		</div>
	);
}

export default Post;

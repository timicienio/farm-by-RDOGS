import React from 'react';
import './Plant.css';

function Post({ title, author, body, coordinates, onClick, moving }) {
	const style = {
		marginLeft: String(6 + 72 * coordinates.x) + 'px',
		marginTop: String(6 + 72 * coordinates.y) + 'px',
	};
	return (
		<div
			className={'plant post' + (moving ? ' moving' : '')}
			style={style}
			onClick={onClick}
		>
			<h1 className='post-title'>{title}</h1>
			<div className='author-container'>
				<h2 className='post-author'>{author}</h2>
			</div>
			<div className='post-body-container'>
				<p className='post-body'>{body}</p>
			</div>
		</div>
	);
}

export default Post;

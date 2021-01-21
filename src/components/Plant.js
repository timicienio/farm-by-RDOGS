import React from 'react';
import { Post, Comment, Reaction } from './Plants';

function Plant(data) {
	switch (data.type) {
		case 'Post':
			return <Post data={data} />;
		case 'Comment':
			return <Comment data={data} />;
		case 'Reaction':
			return <Reaction data={data} />;
		default:
			// console.log('error plant type');
	}
}

export default Plant;

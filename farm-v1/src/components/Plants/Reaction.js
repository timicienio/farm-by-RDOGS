import React from 'react';

function Reaction(data) {
	return (
		<div className='plant reaction'>
			<p className='reaction-body'>{data.body}</p>
		</div>
	);
}

export default Reaction;

import React from 'react';

function StdBox({ className, title, light, children }) {
	return (
		<div className={className + ' std-box' + (light ? ' light' : '')}>
			<div className='std-box-title'>{title}</div>
			<div className='std-box-content'>{children}</div>
		</div>
	);
}

export default StdBox;

import React from 'react';

const Farms = ({userData}) => {
	return (
		<>
			<div className='farms'>
				<h1>{userData.name}'s Farms</h1>
			</div>
		</>
	);
}

export default Farms;

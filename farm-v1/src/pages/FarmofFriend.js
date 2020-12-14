import React from 'react';
import { Link } from 'react-router-dom';

const FarmofFriend = () => {
	return (
		<>
			<div className='farms'>
				<h1>Farms</h1>
			</div>
			<Link to ="/friends">Back to Friend List</Link>
			<br></br>
			<Link to ="/farms/authuser">Go to My Farm</Link>

		</>
	);
}

export default FarmofFriend;

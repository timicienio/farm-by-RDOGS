import React from 'react';
import StdBox from './StdBox';
import { Button } from 'react-bootstrap';

function FriendInfo({ info: { username, email, createdAt } }) {
	return (
		<StdBox
			light
			className='friend-info'
			titleSize={20}
			title={username}
			margin={8}
		>
			<span>Email: {email}</span>
			<span>Joined at: {createdAt}</span>
		</StdBox>
	);
}

export default FriendInfo;

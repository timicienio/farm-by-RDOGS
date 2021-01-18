import React from 'react';
import StdBox from './StdBox';
import { Button } from 'react-bootstrap';

function FriendInfo({ info: { username, email }, large, detailed, width }) {
	return (
		<StdBox
			light
			className='friend-info'
			titleSize={large ? 32 : 20}
			bodySize={large ? 20 : 16}
			title={username}
			margin={8}
			width={width}
		>
			<span>Email: {email}</span>
		</StdBox>
	);
}

export default FriendInfo;

import React, { useState, useEffect } from 'react'

function Friends() {
	const [friendList, setFriendList] = useState([]);

	
	return (
		<>
			<div className='friends'>
				<h1>Friends</h1>
			</div>
			{
				friendList.map((friend, key) => {
            		return <div key={key}>{friend.name}</div>
        		})
			}
		</>
	);
}

export default Friends;

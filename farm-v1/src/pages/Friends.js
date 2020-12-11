import React, { useState, useEffect } from 'react'
//import getFriendList from '../axios';

function Friends() {
	//const [friendList, setFriendList] = useState([]);
	const [friendList, setFriendList] = useState([
		{ name: 'rdogs1'},
		{ name: 'rdogs2'},
		{ name: 'rdogs3'},
		{ name: 'rdogs4'},
		{ name: 'rdogs5'},
		{ name: 'rdogs6'},
		{ name: 'rdogs7'},
		{ name: 'rdogs8'},
		{ name: 'rdogs9'},
		{ name: 'rdogs10'},
		{ name: 'rdogs11'}
	]);

	useEffect( () =>{
		if(!friendList.length){
			setFriendList(getFriendList());
		}
	})
	
	return (
		<>
			<div className='friends'>
				<h1>Friends</h1>
			</div>
			{
				friendList.map((friend, key) => {
            		return <div className='friendList' key={key}>{friend.name}</div>
        		})
			}
		</>
	);
}

export default Friends;

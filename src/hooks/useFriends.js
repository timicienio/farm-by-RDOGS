import React, { useEffect } from 'react';
import {} from '../graphql';
import { AuthContext } from '../context/auth';

const useFriends = () => {
	//TODO
	const [inviteFriendName, setInviteFriendName] = useState("");
	const [invitation, setInvitation] = useState([]);
	const [friends, setFriends] = useState([]);
	const [hasGetFriend, setHasGetFriend] = useState(false);
	const [hasGetInv, setHasGetInv] = useState(false);	

	const inviteFriend = (friendName) => {

	}

	const acceptInvitation = (friendName) =>{

	}

	const handleChange = e => {
		setInviteFriendName(e.target.value);
	};

	useEffect(()=>{
		if(!hasGetFriend){

		}
		if(!hasGetInv){

		}
	})

	return { handleChange, inviteFriend, acceptInvitation, inviteFriendName, invitation, friends}
}
export default {useFriends}

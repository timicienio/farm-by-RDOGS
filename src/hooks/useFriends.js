import React, { useEffect } from 'react';
import { AuthContext } from '../context/auth';
import { GETFRIENDS_MUTATION, SENDINVITATION_MUTATION, GETINVITATIONS_MUTATION, ACCEPTINVITATION_MUTATION } from '../graphql';

const useFriends = () => {
	//TODO
	const [inviteFriendId, setInviteFriendId] = useState("");
	const [invitation, setInvitation] = useState([]);
	const [friends, setFriends] = useState([]);
	const [hasGetFriend, setHasGetFriend] = useState(false);
	const [hasGetInv, setHasGetInv] = useState(false);	

	const [getFriends] = useMutation(GETFRIENDS_MUTATION);
	const [getInvitations] = useMutation(GETINVITATIONS_MUTATION);
	const [sendInvitation] = useMutation(SENDINVITATION_MUTATION);
	const [acceptInvitation] = useMutation(ACCEPTINVITATION_MUTATION);

	const inviteFriend = async() => {
		try{
			const res = await sendInvitation({
				friendId: inviteFriendId,
			})
			setInviteFriendId("");
		}
		catch(err){
			alert(err);
			if(err.message === 'GraphQL error: User not found'){
				console.log("User not found");
			}
			else if(err.message === 'GraphQL error: You cannot be friends with yourself'){
				console.log("You cannot be friends with yourself");
			}
			else if(err.message === 'GraphQL error: Already invited'){
				console.log("Already invited");	
			}		
		}
	}

	const acceptInv = async(friendId) =>{
		try{
			const res = await acceptInvitation({
				friendId: friendId,
			})
			setHasGetFriend(false);
			setHasGetInv(false);
		}
		catch(err){
			alert(err);
			if(err.message === 'GraphQL error: Friend user not found'){
				console.log("Friend user not found");
			}
			else if(err.message === 'GraphQL error: Invitation not found'){
				console.log("Invitation not found");
			}
		}
	}

	const getFriendsList = async() => {
		try {
			const res = await getFriends();
			setFriends(res.data.getFriends);
			setHasGetFriend(true);
		} catch (err) {
			//console.log(err);
			alert(err);
		}
	}

	const getInvitationsList = async() =>{
		try {
			const res = await getInvitations();
			setInvitation(res.data.getInvitations);
			setHasGetInv(true);
		} catch (err) {
			//console.log(err);
			alert(err);
		}
	}

	const handleChange = e => {
		setInviteFriendName(e.target.value);
	};

	useEffect(()=>{
		if(!hasGetFriend){
			getFriendsList();
		}
		if(!hasGetInv){
			getInvitationsList();
		}
	})

	return { handleChange, inviteFriend, acceptInv, inviteFriendName, invitation, friends}
}
export default {useFriends}

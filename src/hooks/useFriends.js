import React, { useState, useEffect, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { AuthContext } from '../context/auth';
import {
	GET_FRIENDS_MUTATION,
	SEND_INVITATION_MUTATION,
	GET_INVITATIONS_MUTATION,
	ACCEPT_INVITATION_MUTATION,
	DECLINE_INVITATION_MUTATION,
} from '../graphql';

const useFriends = () => {
	const { user, logout } = useContext(AuthContext);

	const [inviteFriendName, setInviteFriendName] = useState('');
	const [invitation, setInvitation] = useState([]);
	const [friends, setFriends] = useState([]);
	const [hasGetFriend, setHasGetFriend] = useState(false);
	const [hasGetInv, setHasGetInv] = useState(false);
	const [invitationAlert, setInvitationAlert] = useState('');
	const [acceptInvitationAlert, setAcceptInvitationAlert] = useState('');
	const [declineInvitationAlert, setDeclineInvitationAlert] = useState('');
	const [showInvitationAlert, setShowInvitationAlert] = useState(false);
	const [showAcceptInvitationAlert, setShowAcceptInvitationAlert] = useState(
		false
	);
	const [showDeclineInvitationAlert, setShowDeclineInvitationAlert] = useState(false);

	const [getFriends] = useMutation(GET_FRIENDS_MUTATION);
	const [getInvitations] = useMutation(GET_INVITATIONS_MUTATION);
	const [sendInvitation] = useMutation(SEND_INVITATION_MUTATION);
	const [acceptInvitation] = useMutation(ACCEPT_INVITATION_MUTATION);
	const [declineInvitation] = useMutation(DECLINE_INVITATION_MUTATION);
	
	const inviteFriend = async () => {
		try {
			const res = await sendInvitation({
				variables: {
					friendName: inviteFriendName,
				},
			});
			console.log(res);
			setInviteFriendName('');
		} catch (err) {
			alert(err);
			console.log(err);
			if (err.message === 'GraphQL error: User not found') {
				console.log('User not found');
				setInvitationAlert('User not found!');
			} else if (
				err.message ===
				'GraphQL error: UserInputError: You cannot be friends with yourself'
			) {
				console.log('You cannot be friends with yourself');
				setInvitationAlert('You cannot be friends with yourself :(');
			} else if (err.message === 'GraphQL error: Already invited') {
				console.log('Already invited');
				setInvitationAlert('Already invited.');
			} else {
				console.log(err.message);
				setInvitationAlert('An unknown error occurred.');
			}
			setShowInvitationAlert(true);
		}
	};

	const acceptInv = async friendName => {
		try {
			const res = await acceptInvitation({
				variables: {
					friendName: friendName,
				},
			});
			setHasGetFriend(false);
			setHasGetInv(false);
		} catch (err) {
			alert(err);
			if (err.message === 'GraphQL error: Friend user not found') {
				console.log('Friend user not found');
				setAcceptInvitationAlert('User not found.');
			} else if (err.message === 'GraphQL error: Invitation not found') {
				console.log('Invitation not found');
				setAcceptInvitationAlert('Invitation not found.');
			} else {
				setAcceptInvitationAlert('An unknown error occurred.');
			}
			setShowAcceptInvitationAlert(true);
		}
	};

	const declineInv = async friendName => {
		try {
			const res = await declineInvitation({
				variables: {
					friendName: friendName,
				},
			});
			setHasGetFriend(false);
			setHasGetInv(false);
		} catch (err) {
			alert(err);
			setDeclineInvitationAlert(err.message);
			setShowDeclineInvitationAlert(true);
		}
	};

	const getFriendsList = async () => {
		try {
			const res = await getFriends();
			setFriends(res.data.getFriends);
			setHasGetFriend(true);
		} catch (err) {
			//console.log(err);
			alert(err);
		}
	};

	const getInvitationsList = async () => {
		try {
			const res = await getInvitations();
			setInvitation(res.data.getInvitations);
			setHasGetInv(true);
		} catch (err) {
			//console.log(err);
			alert(err);
		}
	};

	const handleChange = e => {
		setInviteFriendName(e.target.value);
	};

	const dismissInvitationAlert = () => {
		setShowInvitationAlert(false);
	};
	const dismissAcceptInvitationAlert = () => {
		setShowAcceptInvitationAlert(false);
	};
	const dismissDeclineInvitationAlert = () => {
		setShowDeclineInvitationAlert(false);
	};

	useEffect(() => {
		if (!hasGetFriend) {
			getFriendsList();
		}
		if (!hasGetInv) {
			getInvitationsList();
		}
	}, [hasGetFriend, hasGetInv]);

	return {
		handleChange,
		inviteFriend,
		acceptInv,
		declineInv,
		invitationAlert,
		acceptInvitationAlert,
		declineInvitationAlert,
		showInvitationAlert,
		showAcceptInvitationAlert,
		showDeclineInvitationAlert,
		dismissInvitationAlert,
		dismissAcceptInvitationAlert,
		dismissDeclineInvitationAlert,
		inviteFriendName,
		invitation,
		friends,
	};
};
export default useFriends;

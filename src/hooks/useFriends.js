import React, { useState, useEffect, useContext } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { AuthContext } from '../context/auth';
import {
	GET_FRIENDS_MUTATION,
	SEND_INVITATION_MUTATION,
	GET_INVITATIONS_MUTATION,
	ACCEPT_INVITATION_MUTATION,
	DECLINE_INVITATION_MUTATION,
	FRIEND_LIST_SUBSCRIPTION,
	GET_FRIENDS_LIST_QUERY
} from '../graphql';

const useFriends = () => {
	const { user } = useContext(AuthContext);
	
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
	
	const {
		data
	} = useQuery(GET_FRIENDS_LIST_QUERY, {
		variables: {
			userId: user.id,
		},
		pollInterval: 5000,
	});

	useEffect(()=>{
		console.log(data.getFriendList);
		setFriends(data.getFriendList);
	}, [data])

	// useEffect(()=>{
	// 	subscribeToMore({
	// 		document: FRIEND_LIST_SUBSCRIPTION,
	// 		variables: {userId: user.id},
	// 		updateQuery: (prev, { subscriptionData }) => {
	// 			if (!subscriptionData.data) return prev
	// 			const newFriend = subscriptionData.friendList.friend;
	// 			console.log(newFriend);
	// 			console.log(prev);
	// 			return { friends: [...prev.friends, newFriend]};
	// 		},
	// 		onError: err => console.log(err)
	// 	})
	// }, [subscribeToMore])

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
			setInvitationAlert(err.graphQLErrors[0].message);
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
			setAcceptInvitationAlert(err.graphQLErrors[0].message);
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

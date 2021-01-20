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
	GET_FRIENDS_LIST_QUERY,
} from '../graphql';

const useFriends = () => {
	const { user } = useContext(AuthContext);

	const [inviteFriendName, setInviteFriendName] = useState('');
	const [invitation, setInvitation] = useState([]);

	const [hasGetInv, setHasGetInv] = useState(false);
	const [invitationAlert, setInvitationAlert] = useState('');
	const [acceptInvitationAlert, setAcceptInvitationAlert] = useState('');
	const [declineInvitationAlert, setDeclineInvitationAlert] = useState('');
	const [showInvitationAlert, setShowInvitationAlert] = useState(false);
	const [showAcceptInvitationAlert, setShowAcceptInvitationAlert] = useState(
		false
	);
	const [
		showDeclineInvitationAlert,
		setShowDeclineInvitationAlert,
	] = useState(false);

	const [getFriends] = useMutation(GET_FRIENDS_MUTATION);
	const [getInvitations] = useMutation(GET_INVITATIONS_MUTATION);
	const [sendInvitation] = useMutation(SEND_INVITATION_MUTATION);
	const [acceptInvitation] = useMutation(ACCEPT_INVITATION_MUTATION);
	const [declineInvitation] = useMutation(DECLINE_INVITATION_MUTATION);

	const { data, subscribeToMore } = useQuery(GET_FRIENDS_LIST_QUERY, {
		variables: {
			userId: user.id,
		},
	});

	// useEffect(()=>{
	// 	console.log(data.getFriendList);
	// 	setFriends(data.getFriendList);
	// }, [data])
	useEffect(() => {
		subscribeToMore({
			document: FRIEND_LIST_SUBSCRIPTION,
			variables: { userId: user.id },
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) return prev;
				if (
					subscriptionData.data.friendList.mutation === 'FRIEND_LIST'
				) {
					const newFriend = subscriptionData.data.friendList.friend;
					return {
						...prev,
						getFriendList: [...prev.getFriendList, newFriend],
					};
				} else {
					return prev;
				}
			},
			onError: err => console.log(err),
		});
	}, [subscribeToMore, user.id]);

	const inviteFriend = async () => {
		try {
			const res = await sendInvitation({
				variables: {
					friendName: inviteFriendName,
				},
			});
			console.log(res);
			setInviteFriendName('');
			setInvitationAlert('Request sent!');
			setShowInvitationAlert(true);
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
		if (!data) {
			getFriendsList();
		}
		if (!hasGetInv) {
			getInvitationsList();
		}
	}, [data, hasGetInv]);

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
		friends: (data && data.getFriendList) || [],
	};
};
export default useFriends;

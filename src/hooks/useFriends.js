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
	GET_INVITATION_LIST_QUERY,
} from '../graphql';

const useFriends = () => {
	const { user } = useContext(AuthContext);

	const [inviteFriendName, setInviteFriendName] = useState('');

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

	const { data: friends, subscribeToMore: subscribeToMore1 } = useQuery(
		GET_FRIENDS_LIST_QUERY,
		{
			variables: {
				userId: user.id,
			},
		}
	);

	const { data: invitations, subscribeToMore: subscribeToMore2 } = useQuery(
		GET_INVITATION_LIST_QUERY,
		{
			variables: {
				userId: user.id,
			},
		}
	);

	useEffect(() => {
		subscribeToMore1({
			document: FRIEND_LIST_SUBSCRIPTION,
			variables: { userId: user.id },
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) return prev;
				if (
					subscriptionData.data.friendList.mutation === 'FRIEND_LIST'
				) {
					const newFriend = subscriptionData.data.friendList.friend;
					//console.log(newFriend);
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
	}, [subscribeToMore1, user.id]);

	useEffect(() => {
		subscribeToMore2({
			document: FRIEND_LIST_SUBSCRIPTION,
			variables: { userId: user.id },
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) return prev;
				if (
					subscriptionData.data.friendList.mutation ===
					'INVITATION_LIST'
				) {
					const newInvitation =
						subscriptionData.data.friendList.friend;
					//console.log(newInvitation);
					return {
						...prev,
						getInvitationList: [
							...prev.getInvitationList,
							newInvitation,
						],
					};
				} else {
					return prev;
				}
			},
			onError: err => console.log(err),
		});
	}, [subscribeToMore2, user.id]);

	const inviteFriend = async () => {
		try {
			const res = await sendInvitation({
				variables: {
					friendName: inviteFriendName,
				},
			});
			// console.log(res);
			setInviteFriendName('');
			setInvitationAlert('Request sent!');
			setShowInvitationAlert(true);
		} catch (err) {
			setInvitationAlert(err.graphQLErrors[0].message);
			setShowInvitationAlert(true);
		}
	};

	const acceptInv = async friendName => {
		for (let i = 0; i < invitations.getInvitationList.length; i++) {
			if (invitations.getInvitationList[i].username === friendName) {
				invitations.getInvitationList.splice(i, 1);
				break;
			}
		}
		try {
			const res = await acceptInvitation({
				variables: {
					friendName: friendName,
				},
			});
		} catch (err) {
			setAcceptInvitationAlert(err.graphQLErrors[0].message);
			setShowAcceptInvitationAlert(true);
		}
	};

	const declineInv = async friendName => {
		for (let i = 0; i < invitations.getInvitationList.length; i++) {
			if (invitations.getInvitationList[i].username === friendName) {
				invitations.getInvitationList.splice(i, 1);
				break;
			}
		}
		try {
			const res = await declineInvitation({
				variables: {
					friendName: friendName,
				},
			});
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
		if (!friends) {
			getFriendsList();
		}
	}, [friends]);

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
		invitation: (invitations && invitations.getInvitationList) || [],
		friends: (friends && friends.getFriendList) || [],
	};
};
export default useFriends;

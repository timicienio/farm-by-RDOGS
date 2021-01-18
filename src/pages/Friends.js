import React, { useState, useEffect, useContext } from 'react';
import {
	InputGroup,
	FormControl,
	Container,
	Row,
	Col,
	Button,
	Alert,
} from 'react-bootstrap';
//import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';

import StdBox from '../components/StdBox';
import FriendInfo from '../components/FriendInfo';
import useFriends from '../hooks/useFriends';
import './Friends.css';

const Friends = ({}) => {
	// const [friendList, setFriendList] = useState([
	// 	{
	// 		username: 'rdogs1',
	// 		email: 'rdogs1@rdogs.com',
	// 		createdAt: '2021/1/2',
	// 	},
	// 	{
	// 		username: 'timicienio',
	// 		email: 'rdogs2@rdogs.com',
	// 		createdAt: '2021/1/2',
	// 	},
	// 	{
	// 		username: 'fredred',
	// 		email: 'rdogs3@rdogs.com',
	// 		createdAt: '2021/1/2',
	// 	},
	// 	{
	// 		username: 'gary',
	// 		email: 'rdogs4@rdogs.com',
	// 		createdAt: '2021/1/2',
	// 	},
	// ]);

	const { user } = useContext(AuthContext);

	const {
		handleChange,
		inviteFriend,
		acceptInv,
		invitationAlert,
		acceptInvitationAlert,
		showInvitationAlert,
		showAcceptInvitationAlert,
		dismissInvitationAlert,
		dismissAcceptInvitationAlert,
		inviteFriendName,
		invitation,
		friends,
	} = useFriends();

	// useEffect(() => {
	// });

	return (
		<>
			{/* <div className='friends'>
				<h1>{user.username}'s Friends</h1>
			</div> */}
			<Container fluid>
				<Row className='justify-content-md-center'>
					<Col xs={200}>
						<StdBox className='user-info' title='Me' width={742}>
							<FriendInfo info={user} large></FriendInfo>
						</StdBox>
					</Col>
				</Row>
				<Row className='justify-content-md-center'>
					<Col xs={200}>
						<StdBox
							className='friend-list'
							title='Friends'
							// height={600}
							width={360}
						>
							<InputGroup
								className='mb-3'
								// onSubmit={() => inviteFriend()}
							>
								<FormControl
									placeholder='Add friend ...'
									aria-label="Recipient's username"
									aria-describedby='basic-addon2'
									onChange={e => handleChange(e)}
									id='body'
									value={inviteFriendName}
								/>
								<InputGroup.Append>
									<Button
										variant='secondary'
										onClick={() => {
											inviteFriend();
										}}
									>
										Find
									</Button>
								</InputGroup.Append>
							</InputGroup>
							<Alert
								show={showInvitationAlert}
								variant='warning'
								onClose={() => dismissInvitationAlert()}
								dismissible
							>
								<p>{invitationAlert}</p>
							</Alert>

							<div className='friend-list-body'>
								{!friends.length ? (
									<span>Invite your first friend!</span>
								) : (
									friends.map(friend => (
										<FriendInfo
											id={friend.id}
											info={friend}
										/>
									))
								)}
							</div>
						</StdBox>
					</Col>
					<Col xs={500}>
						<StdBox
							className='friend-requests'
							title='Friend Requests'
							// height={600}
							width={360}
						>
							<Alert
								show={showAcceptInvitationAlert}
								variant='warning'
								onClose={() => dismissAcceptInvitationAlert()}
								dismissible
							>
								<p>{invitationAlert}</p>
							</Alert>
							{!invitation.length ? (
								<span>No invitations for now.</span>
							) : (
								invitation.map((friend, key) => {
									return (
										<div className='friendList' key={key}>
											<FriendInfo
												id={key}
												info={friend}
											></FriendInfo>
											<Button
												onClick={() => {
													acceptInv(friend.id);
												}}
												variation='secondary'
											>
												Accept
											</Button>
										</div>
									);
								})
							)}
						</StdBox>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Friends;

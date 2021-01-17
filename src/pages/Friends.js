import React, { useState, useEffect, useContext } from 'react';
import {
	InputGroup,
	FormControl,
	Container,
	Row,
	Col,
	Button,
} from 'react-bootstrap';
//import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';

import StdBox from '../components/StdBox';
import './Friends.css';
import FriendInfo from '../components/FriendInfo';

const Friends = ({ userData }) => {
	const [friendList, setFriendList] = useState([
		{
			username: 'rdogs1',
			email: 'rdogs1@rdogs.com',
			createdAt: '2021/1/2',
		},
		{
			username: 'timicienio',
			email: 'rdogs2@rdogs.com',
			createdAt: '2021/1/2',
		},
		{
			username: 'fredred',
			email: 'rdogs3@rdogs.com',
			createdAt: '2021/1/2',
		},
		{
			username: 'gary',
			email: 'rdogs4@rdogs.com',
			createdAt: '2021/1/2',
		},
	]);

	const { user } = useContext(AuthContext);
	const [formBody, setFormBody] = useState('');
	const [checkInvitation, setCheckInvitation] = useState(false);
	//const [invitation, setInvitation] = useState([]);
	const [invitation, setInvitation] = useState([
		{ name: 'rdogs12' },
		{ name: 'rdogs13' },
	]);

	useEffect(() => {
		//console.log(userData);
		if (!friendList.length) {
			//setFriendList(getFriendList(userData.name));
		}
		if (!checkInvitation) {
			//setInvitation(getInvitationList(userData.name));
			setCheckInvitation(true);
		}
	});

	// const acceptInvitation = friendName => {
	// 	acceptFriend(friendName);
	// 	//setInvitation(getInvitationList(userData.name));
	// 	//setFriendList(getFriendList(userData.name));
	// };

	const handleFormSubmit = e => {
		e.preventDefault();
		console.log('submit form');
		//TODO
		// if (formBody !== '') {
		// 	var msg = addFriend(userData.name, formBody);

		// 	if (msg !== 'success') {
		// 		// alert("User doesn't exist.");
		// 	}
		// 	setFormBody('');
		// }
	};

	return (
		<>
			<div className='friends'>
				<h1>{user.username}'s Friends</h1>
			</div>
			<Container fluid>
				<Row className='justify-content-md-center'>
					<Col xs={200}>
						<StdBox
							className='friend-list'
							title='Friends'
							height={480}
						>
							<InputGroup
								className='mb-3'
								onSubmit={handleFormSubmit}
							>
								<FormControl
									placeholder='Add friend ...'
									aria-label="Recipient's username"
									aria-describedby='basic-addon2'
									onChange={e => setFormBody(e.target.value)}
									id='body'
									value={formBody}
								/>
								<InputGroup.Append>
									<Button variant='secondary'>Find</Button>
								</InputGroup.Append>
							</InputGroup>
							<div className='friend-list-body'>
								{friendList.map(friend => (
									<FriendInfo id={friend.id} info={friend} />
								))}
							</div>
						</StdBox>
					</Col>
					<Col xs={500}>
						<StdBox
							className='friend-requests'
							title='Friend Requests'
						>
							{invitation.map((friend, key) => {
								return (
									<div className='friendList' key={key}>
										{friend.name + '    '}
										<Button
											onClick={
												() => {}
												// acceptInvitation(friend)
											}
										>
											Accept
										</Button>
									</div>
								);
							})}
						</StdBox>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Friends;

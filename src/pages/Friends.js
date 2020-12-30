import React, { useState, useEffect } from 'react';
import {
	InputGroup,
	FormControl,
	Container,
	Row,
	Col,
	Button,
} from 'react-bootstrap';
import {
	getFriendList,
	addFriend,
	getInvitationList,
	acceptFriend,
} from '../axios';
//import { Link } from 'react-router-dom';

import StdBox from '../components/StdBox';
import './Friends.css';

const Friends = ({ userData }) => {
	//const [friendList, setFriendList] = useState([]);
	const [friendList, setFriendList] = useState([
		{ name: 'rdogs1' },
		{ name: 'rdogs2' },
		{ name: 'rdogs3' },
		{ name: 'rdogs4' },
		{ name: 'rdogs5' },
		{ name: 'rdogs6' },
		{ name: 'rdogs7' },
		{ name: 'rdogs8' },
		{ name: 'rdogs9' },
		{ name: 'rdogs10' },
		{ name: 'rdogs11' },
	]);

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

	const acceptInvitation = friendName => {
		acceptFriend(friendName);
		//setInvitation(getInvitationList(userData.name));
		//setFriendList(getFriendList(userData.name));
	};

	const handleFormSubmit = e => {
		e.preventDefault();
		console.log('submit form');
		if (formBody !== '') {
			var msg = addFriend(userData.name, formBody);

			if (msg !== 'success') {
				// alert("User doesn't exist.");
			}
			setFormBody('');
		}
	};

	return (
		<>
			<div className='friends'>
				<h1>{userData.name}'s Friends</h1>
			</div>
			<Container fluid>
				<Row className='justify-content-md-center'>
					<Col xs={200}>
						<StdBox className='friend-list' title='Friends'>
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
							{friendList.map((friend, key) => {
								return (
									<div className='friendList' key={key}>
										{friend.name}
									</div>
								);
							})}
						</StdBox>
					</Col>
					<Col xs={500}>
						<StdBox
							className='friend-invitations'
							title='Invitations'
						>
							{invitation.map((friend, key) => {
								return (
									<div className='friendList' key={key}>
										{friend.name + '    '}
										<Button
											onClick={() =>
												acceptInvitation(friend)
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

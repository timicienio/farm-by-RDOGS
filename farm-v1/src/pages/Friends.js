import React, { useState, useEffect } from 'react'
import { getFriendList, addFriend, getInvitationList, acceptFriend } from '../axios';
//import { Link } from 'react-router-dom';
import {
	Container,
	Row,
	Col,
	Form,
	FormGroup,
	Label,
	Input,
	Button
  } from 'reactstrap'


import classes from './Friend.module.css';

const Friends = ({userData}) => {
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

	const [formBody, setFormBody] = useState('');
	const [checkInvitation, setCheckInvitation] = useState(false);
	//const [invitation, setInvitation] = useState([]);
	const [invitation, setInvitation] = useState([
		{ name: 'rdogs12'},
		{ name: 'rdogs13'}
	]);

	useEffect( () =>{
		//console.log(userData);
		if(!friendList.length){
			//setFriendList(getFriendList(userData.name));
		}
		if(!checkInvitation){
			//setInvitation(getInvitationList(userData.name));
			setCheckInvitation(true);
		}
	})

	const acceptInvitation = (friendName) =>{
		acceptFriend(friendName);
		//setInvitation(getInvitationList(userData.name));
		//setFriendList(getFriendList(userData.name));
	}

	const handleFormSubmit = (
		(e) => {
		  e.preventDefault()
		  console.log("submit form")
		  if (formBody !== ""){
			  var msg = addFriend(userData.name, formBody);
			  
			  if(msg !== "success"){
				  // alert("User doesn't exist.");
			  }
			  setFormBody('');
		  }
		}
	)
	
	return (
		<>
			<div className='friends'>
				<h1>{userData.name}'s Friends</h1>
			</div>
			<Container>
				<Row className={classes.row}>
					<Col xs="20" className={classes.form}>
						<Form onSubmit={handleFormSubmit}>
							<FormGroup row>
							<Label for="body">Add Friend  </Label>
							<Input
								type="text"
								name="body"
								value={formBody}
								id="body"
								placeholder="Enter a Username"
								onChange={(e) => setFormBody(e.target.value)}
							/>
							<Button
								type="submit"
								color="primary"
								disabled={formBody === ''}
							>
								Invite!
							</Button>
							</FormGroup>
						</Form>
						{
							friendList.map((friend, key) => {
								return (
									<div className='friendList' key={key}>{friend.name}</div>
								)
							})
						}
					</Col>
					<Col xs="4" className={classes.invitation}>
						<h2>Invitation</h2>
						{
							invitation.map((friend, key) => {
								return (
									<div className='friendList' key={key}>{friend.name + "    "}
										<Button onClick={()=>acceptInvitation(friend)}>
											Accept
										</Button>
									</div>
								)
							})
						}
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default Friends;

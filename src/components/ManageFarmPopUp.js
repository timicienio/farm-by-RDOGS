import React from 'react';
import { Modal, InputGroup, Form, FormControl, Button } from 'react-bootstrap';
import FriendInfo from './FriendInfo';
import useManageFarmPopUp from '../hooks/useManageFarmPopup';
function ManageFarmPopUp({
	data,
	friends,
	loading,
	show,
	setShow,
	addNewMember,
	leaveFarm,
}) {
	const {
		addNewMemberId,
		handleAddNewMemberIdChange,
		handleSubmitAddNewMember,
		alert,
		showAlert,
		dismissAlert,
	} = useManageFarmPopUp(addNewMember);

	const inFarm = id => {
		for (let i = 0; i < data.getFarm.members.length; i++) {
			if (data.getFarm.members[i].id === id) {
				return true;
			}
		}
		return false;
	};

	return loading ? (
		<></>
	) : (
		<Modal
			size='lg'
			show={show}
			onHide={() => {
				setShow(false);
			}}
			centered
		>
			<Modal.Header closeButton>Manage Farm</Modal.Header>

			<Modal.Body>
				<InputGroup className='mb-3'>
					<FormControl
						as='select'
						onChange={e => handleAddNewMemberIdChange(e)}
						id='add-new-member-input'
						value={addNewMemberId}
					>
						<option value='0'>Choose a friend...</option>
						{friends.map(friend =>
							inFarm(friend.id) ? (
								<></>
							) : (
								<option value={friend.id}>
									{friend.username}
								</option>
							)
						)}
					</FormControl>
					<InputGroup.Append>
						<Button
							variant='secondary'
							onClick={() => handleSubmitAddNewMember()}
						>
							Add Farmer
						</Button>
					</InputGroup.Append>
				</InputGroup>
				<div id='farm-member-list'>
					{data.getFarm.members.map(member => (
						<FriendInfo
							info={{
								username: member.username,
								email: member.email,
							}}
						/>
					))}
				</div>
				<Button
					id='leave-farm-button'
					type='submit'
					variant='secondary'
					onClick={async () => {
						await leaveFarm();
						setShow(false);
					}}
				>
					Leave Farm
				</Button>
			</Modal.Body>
		</Modal>
	);
}

export default ManageFarmPopUp;

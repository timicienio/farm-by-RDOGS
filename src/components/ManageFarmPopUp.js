import React from 'react';
import { Modal, InputGroup, Form, FormControl, Button } from 'react-bootstrap';
import FriendInfo from './FriendInfo';
import useManageFarmPopUp from '../hooks/useManageFarmPopup';
function ManageFarmPopUp({
	data,
	loading,
	show,
	setShow,
	addNewMember,
	leaveFarm,
}) {
	const {
		addNewMemberName,
		handleAddNewMemberNameChange,
		handleSubmitAddNewMember,
		alert,
		showAlert,
		dismissAlert,
	} = useManageFarmPopUp(addNewMember);
	// console.log(data);
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
				<InputGroup
					className='mb-3'
					// onSubmit={() => inviteFriend()}
				>
					<FormControl
						placeholder='Add farm member ...'
						onChange={e => handleAddNewMemberNameChange(e)}
						id='add-new-member-input'
						value={addNewMemberName}
					/>
					<InputGroup.Append>
						<Button
							variant='secondary'
							onClick={() => handleSubmitAddNewMember()}
						>
							Add
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
					variant='secondary'
					onClick={async () => {
						await leaveFarm();
					}}
				>
					Leave Farm
				</Button>
			</Modal.Body>
		</Modal>
	);
}

export default ManageFarmPopUp;

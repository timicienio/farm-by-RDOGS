import React from 'react';
import { Modal, InputGroup, Form, FormControl, Button } from 'react-bootstrap';
import useManageFarmPopUp from '../hooks/useManageFarmPopup';
function ManageFarmPopUp({ show, setShow, addNewMember, leaveFarm }) {
	const {
		addNewMemberName,
		handleAddNewMemberNameChange,
		handleSubmitAddNewMember,
		alert,
		showAlert,
		dismissAlert,
	} = useManageFarmPopUp(addNewMember);
	return (
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
				<Button
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

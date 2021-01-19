import React from 'react';
import { Modal, InputGroup, Form, FormControl, Button } from 'react-bootstrap';
function ManageFarmPopUp({
	show,
	setShow,
	handleChange,
	createNewFarm,
	createFarmName,
	createFarmType,
	alert,
	showAlert,
}) {
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
						placeholder='Add friend ...'
						aria-label="Recipient's username"
						aria-describedby='basic-addon2'
						onChange={e => handleChange(e)}
						id='body'
						value={{}}
					/>
					<InputGroup.Append>
						<Button variant='secondary' onClick={() => {}}>
							Find
						</Button>
					</InputGroup.Append>
				</InputGroup>
			</Modal.Body>
		</Modal>
	);
}

export default ManageFarmPopUp;

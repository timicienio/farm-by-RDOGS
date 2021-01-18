import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
function CreateNewFarmPopUp({
	show,
	setShow,
	handleNewFarmChange,
	createNewFarm,
	createFarmName,
	createFarmType,
}) {
	console.log(Modal);
	return (
		<Modal
			size='lg'
			show={show}
			onHide={() => {
				setShow(false);
			}}
			centered
		>
			<Modal.Header closeButton>Create a new farm...</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group controlId='newFarmForm'>
						<Form.Label>Farm Name</Form.Label>
						<Form.Control
							type='name'
							placeholder='Name'
							onChange={e => handleNewFarmChange(e)}
							value={createFarmName}
						/>
						<Form.Text className='text-muted'>
							Please do not use explicit language.
						</Form.Text>
						<Form.Control
							controlId=''
							as='select'
							onChange={e => {
								handleNewFarmChange(e);
							}}
							value={createFarmType}
						>
							<option>Club</option>
						</Form.Control>
					</Form.Group>

					<Button
						variant='primary'
						type='submit'
						onClick={() => createNewFarm()}
					>
						Submit
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
}

export default CreateNewFarmPopUp;

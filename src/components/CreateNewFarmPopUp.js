import { Model } from 'mongoose';
import React from 'react';
import { Modal, FormGroup } from 'react-bootstrap';
function CreateNewFarmPopUp({
	handleNewFarmChange,
	createNewFarm,
	createFarmName,
}) {
	return (
		<Modal size='lg' centered>
			<Modal.Header closeButton>Create a new farm...</Modal.Header>
			<Model.Body>
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
							onChange={
								(e => {
									handleNewFarmChange(e);
								},
								(value = { createNewFarmType }))
							}
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
			</Model.Body>
		</Modal>
	);
}

export default CreateNewFarmPopUp;

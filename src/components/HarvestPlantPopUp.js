import React from 'react';
import { Modal, Button } from 'react-bootstrap';
function HarvestPlantPopUp({ show, setShow, handleSubmit }) {
	return (
		<Modal size='lg' show={show} onHide={() => setShow(false)} centered>
			<Modal.Header closeButton>Harvest Plant</Modal.Header>
			<Modal.Body>
				<span>Are you sure you want to harvest this plant?</span>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant='primary'
					// type='submit'
					onClick={() => {
						handleSubmit();
						setShow(false);
					}}
				>
					Ok
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default HarvestPlantPopUp;

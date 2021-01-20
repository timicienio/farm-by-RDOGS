import React from 'react';
import useAddNewPlantPopUp from '../hooks/useAddNewPlantPopUp';
import { Modal, Form, Button } from 'react-bootstrap';

function AddPostPopUp({ show, setShow, handlePopUpSubmit }) {
	const [
		title,
		showTitleAlert,
		titleAlert,
		content,
		showContentAlert,
		contentAlert,
		handleTitleChange,
		handleContentChange,
		handleSubmit,
	] = useAddNewPlantPopUp(handlePopUpSubmit, 'Post');
	return (
		<Modal
			size='lg'
			show={show}
			onHide={() => {
				setShow(false);
			}}
			centered
		>
			<Modal.Header closeButton>New Post</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group controlId='newFarmForm'>
						<Form.Control
							type='name'
							placeholder='Title...'
							onChange={e => handleTitleChange(e)}
							value={title}
						/>
						<Form.Text
							// className='text-muted'
							show={showTitleAlert ? 'true' : 'false'}
						>
							<span>{titleAlert}</span>
						</Form.Text>

						<Form.Control
							id='add-post-content'
							as='textarea'
							placeholder='Content...'
							onChange={e => handleContentChange(e)}
							value={content}
						/>
						<Form.Text
							// className='text-muted'
							show={showContentAlert ? 'true' : 'false'}
						>
							<span>{contentAlert}</span>
						</Form.Text>
					</Form.Group>

					<Button
						variant='primary'
						// type='submit'
						onClick={() => {
							handleSubmit();
							setShow(false);
						}}
					>
						Grow!
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
}

export default AddPostPopUp;

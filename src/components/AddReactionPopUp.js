import React from 'react';
import { Modal } from 'react-bootstrap';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

function AddReactionPopUp({ show, setShow, handlePopUpSubmit }) {
	// const [
	// 	title,
	// 	showTitleAlert,
	// 	titleAlert,
	// 	content,
	// 	showContentAlert,
	// 	contentAlert,
	// 	handleTitleChange,
	// 	handleContentChange,
	// 	handleSubmit,
	// ] = useAddNewPlantPopUp(handlePopUpSubmit);
	return (
		<Modal
			id='add-reaction-select'
			show={show}
			onHide={() => {
				setShow(false);
			}}
			centered
		>
			<Modal.Header closeButton>Reaction</Modal.Header>

			<Picker
				onSelect={emoji => {
					handlePopUpSubmit('Empty', emoji.native);
					setShow(false);
				}}
				set='google'
			></Picker>

			{/* <Button
				variant='primary'
				// type='submit'
				onClick={() => handleSubmit()}
			>
				Grow!
			</Button> */}
		</Modal>
	);
}

export default AddReactionPopUp;

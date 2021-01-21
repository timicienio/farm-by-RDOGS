import React from 'react';
import { Modal } from 'react-bootstrap';

import Picker from 'emoji-picker-react';

function AddReactionPopUp({ show, setShow, handlePopUpSubmit }) {
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
				onEmojiClick={(_, emojiObject) => {
					// console.log(emojiObject);
					handlePopUpSubmit('Empty', emojiObject.emoji);
					setShow(false);
				}}
				preload
				// native
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

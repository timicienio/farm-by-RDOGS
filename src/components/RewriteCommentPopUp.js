import React, { useEffect } from 'react';
import useRewritePlantPopUp from '../hooks/useRewritePlantPopUp';
import { Modal, Form, Button } from 'react-bootstrap';

function RewriteCommentPopUp({
	show,
	setShow,
	handlePopUpSubmit,
	oldTitle,
	oldContent,
}) {
	const [
		title,
		setTitle,
		showTitleAlert,
		titleAlert,
		content,
		setContent,
		showContentAlert,
		contentAlert,
		handleTitleChange,
		handleContentChange,
		handleSubmit,
	] = useRewritePlantPopUp(oldTitle, oldContent, handlePopUpSubmit, 'Post');
	useEffect(() => {
		setContent(oldContent);
	}, [oldContent]);
	return (
		<Modal
			size='lg'
			show={show}
			onHide={() => {
				setShow(false);
			}}
			centered
		>
			<Modal.Header closeButton>Rewrite Comment</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group>
						{/* <Form.Control
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
						</Form.Text> */}

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
						Edit!
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
}

export default RewriteCommentPopUp;

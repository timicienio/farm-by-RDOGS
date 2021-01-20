import React, { useState } from 'react';

function useAddNewPlantPopUp(handlePopUpSubmit, plantType) {
	const [title, setTitle] = useState('');
	const [showTitleAlert, setShowTitleAlert] = useState(false);
	const [titleAlert, setTitleAlert] = useState('');
	const [content, setContent] = useState('');
	const [showContentAlert, setShowContentAlert] = useState(false);
	const [contentAlert, setContentAlert] = useState('');
	const handleTitleChange = e => setTitle(e.target.value);
	const handleContentChange = e => setContent(e.target.value);
	const handleSubmit = async () => {
		if (title === '' && plantType === 'Post') {
			setShowTitleAlert(true);
			setTitleAlert('Please enter title.');
		} else {
			setShowTitleAlert(false);
		}
		if (content === '') {
			setShowContentAlert(true);
			setContentAlert('Please enter content');
		} else {
			setShowContentAlert(false);
		}
		if (!showTitleAlert && !showContentAlert) {
			setTitle('');
			setContent('');
			switch (plantType) {
				case 'Post':
					handlePopUpSubmit(title, content);
					break;
				case 'Comment':
					handlePopUpSubmit('Empty', content);
					break;
			}
		}
	};
	return [
		title,
		showTitleAlert,
		titleAlert,
		content,
		showContentAlert,
		contentAlert,
		handleTitleChange,
		handleContentChange,
		handleSubmit,
	];
}

export default useAddNewPlantPopUp;

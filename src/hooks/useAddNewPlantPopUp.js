import React, { useState } from 'react';

function useAddNewPlantPopUp(handlePopUpSubmit, type) {
	const [title, setTitle] = useState('');
	const [showTitleAlert, setShowTitleAlert] = useState(false);
	const [titleAlert, setTitleAlert] = useState('');
	const [content, setContent] = useState('');
	const [showContentAlert, setShowContentAlert] = useState(false);
	const [contentAlert, setContentAlert] = useState('');
	const handleTitleChange = e => setTitle(e.target.value);
	const handleContentChange = e => setContent(e.target.value);
	const handleSubmit = () => {
		if (title === '' && type === 'Post') {
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
			if (type === 'Comment') setTitle('(empty)');
			handlePopUpSubmit(title, content);
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

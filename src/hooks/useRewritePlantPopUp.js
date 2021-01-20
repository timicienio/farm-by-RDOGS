import React, { useState } from 'react';

function useRewritePlantPopUp(
	oldTitle,
	oldContent,
	handlePopUpSubmit,
	plantType
) {
	const [title, setTitle] = useState(oldTitle);
	const [showTitleAlert, setShowTitleAlert] = useState(false);
	const [titleAlert, setTitleAlert] = useState('');
	const [content, setContent] = useState(oldContent);
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
	];
}

export default useRewritePlantPopUp;

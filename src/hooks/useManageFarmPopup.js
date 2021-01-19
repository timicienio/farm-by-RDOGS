import React, { useState } from 'react';

const useManageFarmPopUp = addNewMember => {
	const [addNewMemberName, setAddNewMemberName] = useState('');
	const [alert, setAlert] = useState('');
	const [showAlert, setShowAlert] = useState(false);

	const handleAddNewMemberNameChange = e => {
		setAddNewMemberName(e.target.value);
	};

	const handleSubmitAddNewMember = async () => {
		try {
			await addNewMember(addNewMemberName);
			setAddNewMemberName('');
		} catch (err) {
			console.log(err);
			setAlert(err.message);
			setShowAlert(true);
		}
	};

	const dismissAlert = () => {
		setShowAlert(false);
	};

	return {
		addNewMemberName,
		handleAddNewMemberNameChange,
		handleSubmitAddNewMember,
		alert,
		showAlert,
		dismissAlert,
	};
};

export default useManageFarmPopUp;

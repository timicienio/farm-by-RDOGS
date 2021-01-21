import React, { useState } from 'react';

const useManageFarmPopUp = addNewMember => {
	const [addNewMemberId, setAddNewMemberId] = useState('');
	const [alert, setAlert] = useState('');
	const [showAlert, setShowAlert] = useState(false);

	const handleAddNewMemberIdChange = e => {
		setAddNewMemberId(e.target.value);
	};

	const handleSubmitAddNewMember = async () => {
		try {
			await addNewMember(addNewMemberId);
			setAddNewMemberId('');
		} catch (err) {
			// console.log(err);
			setAlert(err.message);
			setShowAlert(true);
		}
	};

	const dismissAlert = () => {
		setShowAlert(false);
	};

	return {
		addNewMemberId,
		handleAddNewMemberIdChange,
		handleSubmitAddNewMember,
		alert,
		showAlert,
		dismissAlert,
	};
};

export default useManageFarmPopUp;

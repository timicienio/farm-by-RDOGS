import React, { useContext } from 'react';
import { AuthContext } from '../context/auth';
import usePreference from '../hooks/usePreference';
import './Preferences.css';
function Preferences() {
	const { user } = useContext(AuthContext);
	const {
		loading,
		error,
		data,
		handleChange,
		editProfile,
		newProfileAlert,
		showNewProfileAlert,
	} = usePreference();

	return (
		<>
			<div className='preferences'>
				<h1>Preferences</h1>
			</div>
			{loading ? (
				<></>
			) : (
				<h3 id='under-construction'>The best is yet to come...</h3>
			)}
		</>
	);
}

export default Preferences;

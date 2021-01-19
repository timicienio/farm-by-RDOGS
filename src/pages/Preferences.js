import React, {useContext} from 'react';
import { AuthContext } from '../context/auth';
import usePreference from '../hooks/usePreference';
function Preferences() {
	const { user } = useContext(AuthContext);
	const {
		loading,
        error,
        data,
        handleChange,
        editProfile,
        newProfileAlert,
        showNewProfileAlert
	} = usePreference();
	
	return (
		<>
			<div className='preferences'>
				<h1>Preferences</h1>
			</div>
			{loading ? (
				<></>
			) : (
				<div>
					<h3>{user.username}</h3>
					<h3>{data.getUserData.email}</h3>
					<h3>{data.getUserData.profile}</h3>
				</div>
			)}
			
		</>
	);
}

export default Preferences;

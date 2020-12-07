import React from 'react';
import { Link, Redirect } from 'react-router-dom';

function FormLogIn({ userData, setUserData }) {
	return (
		<>
			{userData.loggedIn ? (
				<Redirect to='/home' />
			) : (
				<form>
					<div className='login'>
						<h2>Login</h2>
						<span>TODO...</span>
						<button
							onClick={() => {
								setUserData({
									loggedIn: true,
									name: 'rdogs',
									email: 'rdogs@rdogs.com',
								});
								console.log('logged in');
							}}
						>
							Log In
						</button>
					</div>
				</form>
			)}
		</>
	);
}

export default FormLogIn;

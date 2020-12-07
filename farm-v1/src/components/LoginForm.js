import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

function LoginForm({ setUserData }) {
	const [loggedIn, setLoggedIn] = useState(false);

	return (
		<>
			{loggedIn ? (
				<Redirect to='/farms' />
			) : (
				//<Redirect to='/' />
				<form>
					<div className='login'>
						<h2>Login</h2>
						<span>TODO...</span>
						<Link to='/home'> Go home </Link>
						<button
							onClick={() => {
								setUserData({
									name: 'rdogs',
									email: 'rdogs@rdogs.com',
								});
								console.log('logged in');
								setLoggedIn(true);
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

export default LoginForm;

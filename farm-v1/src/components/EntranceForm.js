import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './EntranceForm.css';
import FormSignup from './FormSignup';
import FormSuccess from './FormSuccess';
import FormLogIn from './FormLogIn';

const EntranceForm = ({ userData, setUserData }) => {
	const [isSubmitted, setIsSubmitted] = useState(false);

	function submitForm() {
		setIsSubmitted(true);
	}

	return (
		<>
			<div className='form-container'>
				{/* <span className='close-btn'>×</span> */}
				<div className='form-content-left'>
					{/* <img
						className='form-img'
						src='img/img-2.svg'
						alt='spaceship'
					/> */}
				</div>
				<Switch>
					{userData.isLoggedIn ? (
						<Redirect to='/home' />
					) : (
						<>
							<Route exact path='/entrance'>
								<Redirect to='/entrance/signup' />
							</Route>
							<Route path='/entrance/signup'>
								{isSubmitted ? (
									<FormSuccess />
								) : (
									<FormSignup submitForm={submitForm} />
								)}
							</Route>
							<Route path='/entrance/login'>
								<FormLogIn
									userData={userData}
									setUserData={setUserData}
								/>
							</Route>
						</>
					)}
				</Switch>
			</div>
		</>
	);
};

export default EntranceForm;

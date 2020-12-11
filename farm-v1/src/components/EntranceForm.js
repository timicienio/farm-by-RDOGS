import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './EntranceForm.css';
import FormSignup from './FormSignup';
import FormSuccess from './FormSuccess';
import FormLogIn from './FormLogIn';
//import createUser from '../axios';

const EntranceForm = ({ userData, setUserData }) => {
	const [isSubmitted, setIsSubmitted] = useState(false);

	function submitSignUpForm() {
		setIsSubmitted(true);
		//createUser(email, name, hashValue);
	}

	function submitLogInForm(values) {
		//TODO: callbacks for log in (optional)
		//console.log(values);
		setUserData({
			loggedIn: true,
			name: values.username,
			passwords: values.password,
		});
		
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
									<FormSignup submitForm={submitSignUpForm} />
								)}
							</Route>
							<Route path='/entrance/login'>
								<FormLogIn
									userData={userData}
									setUserData={setUserData}
									submitForm={submitLogInForm}
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

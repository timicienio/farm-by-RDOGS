import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './EntranceForm.css';
import FormSignup from './FormSignup';
import FormSuccess from './FormSuccess';
import FormLogIn from './FormLogIn';

const EntranceForm = ({ userData, setUserData }) => {
	const [isSubmitted, setIsSubmitted] = useState(false);

	function submitSignUpForm() {
		setIsSubmitted(true);
		//console.log(values);
		// console.log(email);
	}

	function submitLogInForm(values, token) {
		//TODO: callbacks for log in (optional)
		//console.log(values);
		setUserData({
			loggedIn: true,
			name: values.username,
			passwords: values.password,
			token: token
		});
	}

	return (
		<>
			<div className='form-container'>
				<div className='form-content-left'>
					<div className='entrance-title'>Farm by RDOGS</div>
				</div>
				<Switch>
					{userData.loggedIn ? (
						<Redirect to='/friends' />
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

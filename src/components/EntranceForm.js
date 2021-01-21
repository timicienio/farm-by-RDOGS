import React, { useState, useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './EntranceForm.css';
import FormSignup from './FormSignup';
import FormSuccess from './FormSuccess';
import FormLogIn from './FormLogIn';
import { AuthContext } from '../context/auth';

const EntranceForm = ({ userData, setUserData }) => {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const { user } = useContext(AuthContext);

	function submitSignUpForm() {
		setIsSubmitted(true);
		//// console.log(values);
		// // console.log(email);
	}

	function submitLogInForm(values, token) {
		setUserData({
			loggedIn: true,
			name: values.username,
			passwords: values.password,
			token: token,
		});
	}

	return (
		<>
			<div className='form-container'>
				<div className='form-content-left'>
					<div className='entrance-title'>
						<span id='name'>Farm</span>
						<span id='by-rdogs'>by RDOGS</span>
					</div>
				</div>
				<Switch>
					{userData.loggedIn ? (
						<Redirect to='/' />
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

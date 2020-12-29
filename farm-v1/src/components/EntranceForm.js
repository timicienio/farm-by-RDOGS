import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './EntranceForm.css';
import FormSignup from './FormSignup';
import FormSuccess from './FormSuccess';
import FormLogIn from './FormLogIn';

import { useQuery, useMutation } from '@apollo/react-hooks'
import { REGISTER_MUTATION } from '../graphql'


const EntranceForm = ({ userData, setUserData }) => {
	const [isSubmitted, setIsSubmitted] = useState(false);

	const [register] = useMutation(REGISTER_MUTATION)
	// const res = await register({
	// 			variables: {
	// 				username: values.username,
	// 				passwordHash: cyrb53(values.password),
	// 				confirmHash: cyrb53(values.password2),
	// 				email: values.email
	// 			}
	// 		})
	
	function submitSignUpForm() {
		setIsSubmitted(true);
		//console.log(values);
		// console.log(email);
	}

	function submitLogInForm(values) {
		//TODO: callbacks for log in (optional)
		console.log(values);
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

import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import useLogInForm from '../hooks/useLogInForm';
import validate from '../functions/validateSignInInfo';
import './EntranceForm.css';

function FormLogIn({ submitForm, userData, setUserData }) {
	const { handleChange, handleSubmit, values, errors } = useLogInForm(
		submitForm,
		validate
	);

	return (
		<>
			{userData.loggedIn ? (
				<Redirect to='/friends' />
			) : (
				<div className='form-content-right'>
					<form className='form' noValidate>
						<h1>Welcome back!</h1>
						<div className='form-inputs'>
							<label className='form-label'>Username</label>
							<input
								className='form-input'
								type='text'
								name='username'
								placeholder='Enter your username'
								value={values.username}
								onChange={handleChange}
							/>
							{errors.username && <p>{errors.username}</p>}
						</div>
						<div className='form-inputs'>
							<label className='form-label'>Password</label>
							<input
								className='form-input'
								type='password'
								name='password'
								placeholder='Enter your password'
								value={values.password}
								onChange={handleChange}
							/>
							{errors.password && <p>{errors.password}</p>}
						</div>
						<button
							className='form-input-btn'
							type='submit'
							onClick={handleSubmit}
						>
							Log In
						</button>
						<span className='form-input-login'>
							Want a new account? Signup
							<Link to='/entrance/signup'> here</Link>.
						</span>
					</form>
				</div>
			)}
		</>
	);
}

export default FormLogIn;

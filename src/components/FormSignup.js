import React, { useState } from 'react';
import validate from '../functions/validateSignupInfo';
import useForm from '../hooks/useForm';
import './EntranceForm.css';
import { Link } from 'react-router-dom';
import cyrb53 from '../functions/hashFunction';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { REGISTER_MUTATION } from '../graphql';

const FormSignup = ({ submitForm }) => {
	const [register] = useMutation(REGISTER_MUTATION);
	const handleRegister = async () => {
		// console.log(errors);
		//// console.log(values);
		//// console.log(values.username)
		if (values.username != '') {
			// console.log(values);
			// console.log(values.username);
			const res = await register({
				variables: {
					username: values.username,
					passwordHash: cyrb53(values.password),
					confirmHash: cyrb53(values.password2),
					email: values.email,
				},
			});

			// console.log(res);
		}
	};
	const { handleChange, handleSubmit, values, errors } = useForm(
		submitForm,
		validate
	);

	return (
		<div className='form-content-right'>
			<form onSubmit={handleSubmit} className='form' noValidate>
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
					<label className='form-label'>Email</label>
					<input
						className='form-input'
						type='email'
						name='email'
						placeholder='Enter your email'
						value={values.email}
						onChange={handleChange}
					/>
					{errors.email && <p>{errors.email}</p>}
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
				<div className='form-inputs'>
					<label className='form-label'>Confirm Password</label>
					<input
						className='form-input'
						type='password'
						name='password2'
						placeholder='Confirm your password'
						value={values.password2}
						onChange={handleChange}
					/>
					{errors.password2 && <p>{errors.password2}</p>}
				</div>
				<button className='form-input-btn' type='submit'>
					Sign up
				</button>
				<span className='form-input-login'>
					Already have an account? Login
					<Link to='/entrance/login'> here</Link>.
				</span>
			</form>
		</div>
	);
};

export default FormSignup;

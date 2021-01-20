import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './EntranceForm.css';

const FormSuccess = () => {
	const [clicked, setClicked] = useState(false);
	return !clicked ? (
		<div className='form-content-right'>
			<h1 className='form-success'>Welcome to Farm!</h1>

			<Button id='form-success-button' onClick={() => setClicked(true)}>
				Login
			</Button>

			{/* <img
				className='form-img-2'
				src='img/img-3.svg'
				alt='success-image'
			/> */}
		</div>
	) : (
		<Redirect to='/entrance/login' />
	);
};

export default FormSuccess;

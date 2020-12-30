import React from 'react';
import { Link } from 'react-router-dom';
import './EntranceForm.css';

const FormSuccess = () => {
	return (
		<div className='form-content-right'>
			<h1 className='form-success'>We have received your request!</h1>
			<h1 className='form-success'>Now, you can log-in with your e-mail</h1>
			<h2 className='form-success'>
					click here to login!
					<Link to='/entrance/login'> here</Link>.
			</h2>
			{/* <img
				className='form-img-2'
				src='img/img-3.svg'
				alt='success-image'
			/> */}
		</div>
	);
};

export default FormSuccess;

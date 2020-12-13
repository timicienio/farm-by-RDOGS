import { useState, useEffect } from 'react';
import { createUser } from '../axios';
import cyrb53 from '../functions/hashFunction';

const useForm = (callback, validate) => {
	const [values, setValues] = useState({
		username: '',
		email: '',
		password: '',
		password2: '',
	});
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = e => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
	};

	const handleSubmit = e => {
		e.preventDefault();

		setErrors(validate(values));
		setIsSubmitting(true);
	};

	useEffect(() => {
		if (Object.keys(errors).length === 0 && isSubmitting) {
			createUser(values.email, values.username, cyrb53(values.password))
			callback();
		}
	}, [errors]);

	return { handleChange, handleSubmit, values, errors };
};

export default useForm;

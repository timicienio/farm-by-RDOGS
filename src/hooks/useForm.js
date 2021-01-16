import { useState, useEffect, useContext } from 'react';
// import { createUser } from '../axios';
import cyrb53 from '../functions/hashFunction';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { REGISTER_MUTATION } from '../graphql';
import { AuthContext } from '../context/auth';

const useForm = (callback, validate) => {
	const context = useContext(AuthContext);
	const [values, setValues] = useState({
		username: '',
		email: '',
		password: '',
		password2: '',
	});
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const [register] = useMutation(REGISTER_MUTATION);
	const handleRegister = async values => {
		//console.log(errors);
		//console.log(values);
		//console.log(values.username)
		if (values.username !== '') {
			//console.log(values);
			//console.log(values.username);
			try {
				const res = await register({
					variables: {
						username: values.username,
						passwordHash: String(cyrb53(values.password)),
						confirmHash: String(cyrb53(values.password2)),
						email: values.email,
					},
				});
				//console.log(res.data.register);
				//context.login(res.data.register);
				//console.log(res);
				setIsSubmitted(true);
			} catch (err) {
				//console.log(err);
				if (err.message === 'GraphQL error: Username is taken') {
					//console.log("hello");
					var newErrors = { username: 'User Exists' };
					setErrors(newErrors);
				} else if (
					err.message === 'GraphQL error: Email already registered'
				) {
					var newErrors1 = { email: 'Email already registered' };
					setErrors(newErrors1);
				} else {
					var newErrors2 = {
						username: 'Invalid. Please contact development.',
					};
					setErrors(newErrors2);
				}
			}
			//setIsSubmitted(false);
		}
	};

	const handleChange = e => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
	};

	const handleSubmit = e => {
		e.preventDefault();

		var errors = validate(values);
		//console.log(errors);
		setErrors(errors);
		//console.log(typeof errors)
		if (Object.keys(errors).length === 0) {
			handleRegister(values);
			//console.log("handleRegister")
		}
		setIsSubmitting(true);
	};

	useEffect(() => {
		if (Object.keys(errors).length === 0 && isSubmitting && isSubmitted) {
			callback();
		}
	}, [errors]);
	useEffect(() => {
		if (Object.keys(errors).length === 0 && isSubmitting && isSubmitted) {
			callback();
		}
	}, [isSubmitted]);

	return { handleChange, handleSubmit, values, errors };
};

export default useForm;

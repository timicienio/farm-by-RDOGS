import { useState, useEffect } from 'react';
import { createUser } from '../axios';
import cyrb53 from '../functions/hashFunction';
import { useQuery, useMutation } from '@apollo/react-hooks'
import { REGISTER_MUTATION } from '../graphql'


const useForm = (callback, validate) => {
	const [values, setValues] = useState({
		username: '',
		email: '',
		password: '',
		password2: '',
	});
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const [register] = useMutation(REGISTER_MUTATION)
	const handleRegister = async (values) =>{
		console.log(errors);
		//console.log(values);
		//console.log(values.username)
		if(values.username != ""){
			console.log(values);
			console.log(values.username);	
			console.log({variables: {
				registerInput:{
					username: values.username,
					passwordHash: "abcd",
					confirmHash: "abcd",
					email: values.email	 
				}
			}});
			const res = await register({
				variables: {
					username: values.username,
					passwordHash: "abcd",
					confirmHash: "abcd",
					email: values.email	 
				}
			})
			console.log(res);
		}
	}

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
		handleRegister(values);
		console.log("handleRegister")
		//setIsSubmitting(true);
	};

	useEffect(() => {
		if (Object.keys(errors).length === 0 && isSubmitting) {
			//createUser(values.email, values.username, cyrb53(values.password))
			callback();
		}
	}, [errors]);

	return { handleChange, handleSubmit, values, errors };
};

export default useForm;

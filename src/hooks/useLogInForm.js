import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks'
import { LOGIN_MUTATION } from '../graphql'
import cyrb53 from '../functions/hashFunction';

const useLogInForm = (callback, validate) => {
	const [values, setValues] = useState({
		username: '',
		password: '',
	});
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [token, setToken] = useState("");

	const [login] = useMutation(LOGIN_MUTATION)
	const handleLogin = async (values) =>{
		//console.log(errors);
		if(values.username != ""){
			//console.log(values);
			try{
				const res = await login({
					variables: {
						username: values.username,
						passwordHash: String(cyrb53(values.password)),
					}
				})
				//console.log(res.data.login.token);
				setToken(res.data.login.token)
				setIsSubmitted(true);
			}
			catch(err){
				console.log(err)
				if (err.message == "GraphQL error: User not found"){
					//console.log("hello");
					var errors = {username: "User not found"} 
					setErrors(errors);
				}
				else if (err.message == "GraphQL error: Wrong credentials"){
					var errors = {password: "Wrong password"} 
					setErrors(errors);
				}
				else{
					var errors = {username: "Wrong Username or Password"} 
					setErrors(errors);
				}
			}
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
		//console.log(errors);
		setIsSubmitting(true);

		if (Object.keys(errors).length === 0){
			handleLogin(values);
			//console.log("handleLoginr")	
		}
		
	};

	useEffect(() => {
		if (Object.keys(errors).length === 0 && isSubmitting && isSubmitted) {
			callback(values, token);
			//console.log(values);
		}
	}, [errors]);
	useEffect(() => {
		if (Object.keys(errors).length === 0 && isSubmitting && isSubmitted) {
			callback(values, token);
			//console.log(values);
		}
	}, [isSubmitted]);

	return { handleChange, handleSubmit, values, errors };
};

export default useLogInForm;

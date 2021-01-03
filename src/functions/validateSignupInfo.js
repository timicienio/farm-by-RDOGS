import cyrb53 from '../functions/hashFunction';

export default function validateSignupInfo(values) {
	let errors = {};

	if (!values.username.trim()) {
		errors.username = 'Username required';
	} else if (!/^[A-Za-z]+/.test(values.username.trim())) {
		errors.username = 'Enter a valid name';
	}
	// else {
	// 	var msg = checkUserExist(values.username);
	// 	if (msg === 'User exists')
	// 		errors.username = msg;
	// }

	if (!values.email) {
		errors.email = 'Email required';
	} else if (!/\S+@\S+\.\S+/.test(values.email)) {
		errors.email = 'Email address is invalid';
		// if(!errors.email){
		// 	var msg = checkEmailExist(values.email);
		// 	if (msg === 'email has been registered!')
		// 		errors.email = msg;
		// }
	}
	if (!values.password) {
		errors.password = 'Password is required';
	} else if (values.password.length < 6) {
		errors.password = 'Password needs to be 6 characters or more';
	}

	if (!values.password2) {
		errors.password2 = 'Password is required';
	} else if (values.password2 !== values.password) {
		errors.password2 = 'Passwords do not match';
	}

	return errors;
}

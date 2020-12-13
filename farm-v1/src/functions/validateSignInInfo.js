import cyrb53 from './hashFunction';
import {validateLogin} from '../axios';

export default function validateSignInInfo(values) {
	let errors = {};
	if (!values.username.trim()) {
		errors.username = 'Username required';
	}
	// TODO: validate credentials
	let hashValue = cyrb53(values.password);
	// console.log("hash value:", hashValue);
	// send hash values to backend
	var msg = validateLogin(values.username, hashValue);
	
	if(msg === "Error"){
		errors.password = 'Wrong password';
	}
	return errors;
}

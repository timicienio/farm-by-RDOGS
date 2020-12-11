import cyrb53 from './hashFunction';

export default function validateSignInInfo(values) {
	let errors = {};
	if (!values.username.trim()) {
		errors.username = 'Username required';
	}
	// TODO: validate credentials
	let hashValue = cyrb53(values.password);
	// console.log("hash value:", hashValue);
	// send hash values to backend

	// when hash value is false
	// errors.password = 'Wrong password';
	return errors;
}

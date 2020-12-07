export default function validateSignInInfo(values) {
	let errors = {};
	if (!values.username.trim()) {
		errors.username = 'Username required';
	}
	// TODO: validate credentials
}

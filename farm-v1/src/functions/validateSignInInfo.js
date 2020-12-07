// hash method : cyrb53
const cyrb53 = function(str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
    h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1>>>0);
};

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

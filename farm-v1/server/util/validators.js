module.exports.validateRegisterInput = (
    username,
    email,
    passwordHash,
    confirmHash
) => {
    const errors = {};
    if(username.trim() === '')
    {
        errors.username = 'Username must not be empty';
    }
    if(email.trim() === '')
    {
        errors.username = 'Email must not be empty';
    }
    else
    {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if(!email.match(regEx)){
            errors.email = 'Email must be a valid email address';
        }
    }
    if(passwordHash !== confirmHash)
    {
        console.log(passwordHash);
        console.log(confirmHash);
        console.log(passwordHash === confirmHash);
        errors.confirmHash = 'Passwords must match';
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateLoginInput = (username, passwordHash) => {
    const errors = {};
    if(username.trim() === '')
    {
        errors.username = 'Username must not be empty';
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}
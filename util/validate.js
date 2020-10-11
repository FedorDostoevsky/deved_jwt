const isEmail = email => {
	const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (email.match(regex)) return true;
	else return false
}

const isEmpty = string => {
	if (string.trim() === '') return true;
	else return false
}

exports.validateUserData = (name, email, password) => {
	let errors = {};

	if (isEmpty(email)) {
		errors.email = 'email must not be empty'
	} else if (!isEmail(email)) {
		errors.email = 'not valid email'
	}

	if (isEmpty(password)) errors.password = 'password must noy be empty'
	if (isEmpty(name)) errors.name = 'name must not be empty'

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false
	}
};
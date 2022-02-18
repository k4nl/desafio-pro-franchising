const s = require('./status');

const error = {
  emailAlreadyExist: { status: s.alreadyExists, message: 'Email already exists, please choose another email' },
  userNotFound: { status: s.notFound, message: 'User not found'},
  incorrectPassword: {status: s.unauthorized, message: 'Incorrect Password'},
}



module.exports = error;
const s = require('./status');

const error = {
  emailAlreadyExist: { status: s.alreadyExists, message: 'Email already exists, please choose another email' },
}

module.exports = error;
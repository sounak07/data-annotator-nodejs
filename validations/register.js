const validator = require('validator');
const isEmpty = require('./is-Empty');

module.exports = function registrationValid(data, type) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';
  
  if (!validator.isEmail(data.email)) {
    errors[`email`] = 'email not valid';
  }

  if (validator.isEmpty(data.email)) {
    errors[`email`] = 'email cannot be empty';
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors[`Password`] = 'Password must have atleast 6 characters';
  }

  if (validator.isEmpty(data.password)) {
    errors[`Password`] = 'Password cannot be empty';
  }

  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords do not match';
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm password is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

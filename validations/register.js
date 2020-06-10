const validator = require('validator');
const isEmpty = require('./is-Empty');

module.exports = function registrationValid(data, type) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.phone = !isEmpty(data.phone) ? data.phone : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Must have atleast 2 characters';
  }

  if (validator.isEmpty(data.name)) {
    errors.name = 'Name cannot be empty';
  }

  if (!validator.isNumeric(data.phone)) {
    errors[`${type}phone`] = 'phone not valid';
  }

  if (validator.isEmpty(data.phone)) {
    errors[`${type}phone`] = 'phone cannot be empty';
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors[`${type}Password`] = 'Password must have atleast 6 characters';
  }

  if (validator.isEmpty(data.password)) {
    errors[`${type}Password`] = 'Password cannot be empty';
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

const validator = require('validator');
const isEmpty = require('./is-Empty');

module.exports = function loginInputValid(data, type) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!validator.isEmail(data.email)) {
    errors[`${type}email`] = 'email is not valid';
  }

  if (validator.isEmpty(data.email)) {
    errors[`${type}email`] = 'email field is required';
  }

  if (validator.isEmpty(data.password)) {
    errors[`${type}Password`] = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

const validator = require('validator');
const isEmpty = require('./is-Empty');

module.exports = function loginInputValid(data, type) {
  let errors = {};

  data.phone = !isEmpty(data.phone) ? data.phone : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!validator.isNumeric(data.phone)) {
    errors[`${type}phone`] = 'phone is not valid';
  }

  if (validator.isEmpty(data.phone)) {
    errors[`${type}phone`] = 'phone field is required';
  }

  if (validator.isEmpty(data.password)) {
    errors[`${type}Password`] = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

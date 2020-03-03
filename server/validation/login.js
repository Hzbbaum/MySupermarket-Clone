const Validator = require('validator');
const isEmpty = require('./is-empty');
/**
 * validates the data for a login request
 * @param {ID, password} data 
 */
function validateLoginInput(data) {
    let errors = {};

    data.ID = !isEmpty(data.ID) ? data.ID : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }
    if (Validator.isEmpty(data.ID)) {
        errors.email = 'Email field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
module.exports = validateLoginInput;
//#region imports

const Validator = require("validator");
const isEmpty = require("./is-empty");
//#endregion

/**
 * validates data for the pre register check
 * @param {*} data - {ID, email, password1, password2}
 * @returns {errors, isValid}
 */
function validatePreRegisterInput(data) {
  let errors = {};

  data.ID = !isEmpty(data.ID) ? data.ID : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password1) ? data.password1 : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.ID, { min: 9, max: 9 })) {
    errors.name = "ID must be 9 numbers long";
  }
  if (!Validator.isNumeric(data.ID)) {
    errors.name = "ID must be 9 numbers long";
  }
  if (Validator.isEmpty(data.ID)) {
    errors.name = "ID field is required";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (!Validator.isLength(data.password, { min: 4, max: 30 })) {
    errors.password = "Password must be between 4 and 30 characters";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
module.exports = validatePreRegisterInput;

//#region imports

const Validator = require("validator");
const isEmpty = require("./is-empty");
//#endregion

/**
 * validates data for register request
 * @param {*} data - {ID, email, password, city, street, name, surname}
 * @returns {errors, isValid}
 */
function validateRegisterInput(data) {
  let errors = {};

  data.ID = !isEmpty(data.ID) ? data.ID : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.street = !isEmpty(data.street) ? data.street : "";
  data.name = !isEmpty(data.name) ? data.name : "";
  data.surname = !isEmpty(data.surname) ? data.surname : "";

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
  if (Validator.isEmpty(data.name)) {
    errors.password = "name field is required";
  }
  if (Validator.isEmpty(data.surname)) {
    errors.password = "surname field is required";
  }
  if (Validator.isEmpty(data.city)) {
    errors.password = "city field is required";
  }
  if (Validator.isEmpty(data.street)) {
    errors.password = "street field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
module.exports = validateRegisterInput;

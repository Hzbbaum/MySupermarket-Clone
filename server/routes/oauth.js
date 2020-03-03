//#region imports
const route = require("express").Router();
const User = require("../db/models/users");
//#endregion

const validatePreRegisterInput = require("../validation/user-pre");

//#region endpoints

// get check if user exists
// the data should be attached as a body to the get request
route.get("/check", (req, res) => {
  const { errors, isValid } = validatePreRegisterInput(req.body);
  //Check validation
  if (!isValid) {
    return res.status(400).json({ errors });
  }
  User.findOne({ ID: req.body.ID }).then(user => {
    if (user) {
      errors.ID = "ID already exists";
      return res.status(400).json({ errors });
    } else {
      const requestedUser = { ID: req.body.ID, email: req.body.email };
      res.json(requestedUser);
    }
  });
});
//#endregion

module.exports = route;

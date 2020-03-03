//#region imports
const route = require("express").Router();
const User = require("../db/models/users");
//#endregion

const validatePreRegisterInput = require("../validation/user-pre");
const validateRegisterInput = require("../validation/register");

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

// register new user
route.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  //Check validation
  if (!isValid) {
    return res.status(400).json({ errors });
  }
  User.findOne({ ID: req.body.ID }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        ID: req.body.ID,
        password: req.body.password,
        email: req.body.email,
        name: req.body.name,
        surname: req.body.surname,
        city: req.body.city,
        street: req.body.street
      });
      //todo bcrypt
      newUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    }
  });
});
//#endregion

module.exports = route;

// caken almosst verbatim from the youtuber devEd, aka Simo Edwin

//#region imports
const route = require("express").Router();
const User = require("../db/models/users");
//#endregion

const validatePreRegisterInput = require("../validation/user-pre");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
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

// login existing user
route.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  //Check validation
  if (!isValid) {
    return res.status(400).json({ errors });
  }
  const ID = req.body.ID;
  const password = req.body.password;
  //Find by ID
  User.findOne({ ID }).then(user => {
    if (!user) {
      errors.ID = "user not found";
      return res.status(404).json(errors);
    }
    //Check password
    // bcrypt.compare(password, user.password).then(isMatch => {
    //   if (isMatch) {
    //     //User Matched
    //     const payload = { id: user.id, name: user.name, avatar: user.avatar }; //Create JWT Payload
    // (err, token) => {

    //this replaces the bcrypt compare
    if (user.password === password) {
      const { _id, password, ...resUser } = user.toObject();
      res.json({ success: true, user:resUser });
    } else {
      errors.password = "Password incorrect";
      return res.status(400).json(errors);
    }
  });
});
//#endregion

module.exports = route;

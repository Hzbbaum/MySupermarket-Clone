//#region imports
const mongoose = require("mongoose");
const route = require("express").Router();

//#endregion
//#region models
const User = require("../db/models/users");
//#endregion

//#region fake data
const users = require("../db/fake data/fakeUsers");
//#endregion
route.post("", (req, res) => {
  // clear existing data
  User.find().remove();
  User.insertMany(users);
  res.send(users);
});

module.exports = route;

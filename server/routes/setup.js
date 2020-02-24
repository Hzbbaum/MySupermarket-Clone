//#region imports
const mongoose = require("mongoose");
const express = require("express");
const createDb = require("../db actions/createDb")
//#endregion

//#region setup
const route = express.Router();
//#endregion

//#region routes
//setup route
route.post("", (req, res) => {
  createDb();
  res.send("created")
});
//#endregion

module.exports = route;
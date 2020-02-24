//#region imports
const route = require("express").Router();
const queryDb = require("../db actions/queryDb");
//#endregion

//#region endpoints
// get all products
route.get("/", (req, res) => {
  res.send(queryDb());
});
//#endregion

module.exports = route;
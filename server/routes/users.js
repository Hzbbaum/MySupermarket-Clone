//#region imports
const route = require("express").Router();
//#endregion

//#region endpoints
// get all users
route.get("/", (req, res) => {
  res.send("users");
});
//#endregion

module.exports = route;
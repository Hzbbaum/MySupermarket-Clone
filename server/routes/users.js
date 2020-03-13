//#region imports
const route = require("express").Router();
//#endregion

//#region endpoints
// get all users
route.get("/", (req, res) => {
  res.send("users");
});
route.post('/tocart')
//#endregion

module.exports = route;
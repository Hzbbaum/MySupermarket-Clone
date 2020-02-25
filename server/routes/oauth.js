//#region imports
const route = require("express").Router();
//#endregion

//#region endpoints
// get all oauth
route.get("/", (req, res) => {
  res.send("oauth");
});
//#endregion

module.exports = route;
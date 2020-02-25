//#region imports
const route = require("express").Router();
//#endregion

//#region endpoints
// get all products
route.get("/", (req, res) => {
  res.send("products");
});
//#endregion

module.exports = route;
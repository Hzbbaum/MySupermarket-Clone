//#region imports
const route = require("express").Router();
const User = require("../db/models/users");
//#endregion

//#region endpoints
// get check if user exists
route.get("/check", (req, res) => {
  const responseJson = { success: false };
  const requestedEmail = req.query.email;
  if (requestedEmail) {
    User.findOne({ email: req.query.email }).then(user => {
      if (user) {
        responseJson.success = true;
        return res.status(200).json(responseJson);
      } else {
        responseJson.success = false;
        responseJson.error = "username is taken";
        res.status(400).json(responseJson);
      }
    });
  } else {
    responseJson.errors = "invalid username requested";
    res.status(400).json(responseJson);
  }
});
//#endregion

module.exports = route;

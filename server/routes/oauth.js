//#region imports
const route = require("express").Router();
const User = require("../db/models/users");
//#endregion

const emailRegexValidator = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

//#region endpoints
// get check if user exists
route.get("/check", (req, res) => {
  const responseJson = { success: false };
  const requestedEmail = req.query.email;
  const requestedId = req.query.id;
  if(!emailRegexValidator.test(requestedEmail)){
    responseJson.error = "invalid email address";
    res.status(400).json(responseJson);
  }
  if (requestedId) {
    User.findOne({ ID: requestedId }).then(user => {
      if (user) {
        responseJson.error = "requested Id already exists"
        return res.status(400).json(responseJson);
      } else {
        responseJson.success = true;
        res.status(200).json(responseJson);
      }
    });
  } else {
    responseJson.errors = "invalid id requested";
    res.status(400).json(responseJson);
  }
});
//#endregion

module.exports = route;

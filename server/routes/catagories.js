//#region imports
const Catagories = require("../db/models/catagories");
//#endregion

const route = require("express").Router();
//#region endpoints

//get all catagories
route.get(`/`, (req, res) => {
  Catagories.find().then(data => res.json(data));
});
//#endregion
module.exports = route;

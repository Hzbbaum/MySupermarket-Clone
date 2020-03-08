//#region imports
const mongoose = require("mongoose");
const route = require("express").Router();

//#endregion
//#region models
const User = require("../db/models/users");
const Product = require("../db/models/products");
const Catagories = require("../db/models/catagories");
//#endregion

//#region fake data
const users = require("../db/fake data/fakeUsers.json").users;
const products = require("../db/fake data/fakeProducts.json").products;
const catagories = require("../db/fake data/fakeCatagories.json").catagories;
//#endregion
route.post("/setup", async (req, res) => {
  // clear existing data
  try {
    await User.find().deleteMany();
    await Catagories.find().deleteMany();
    await Product.find().deleteMany();

    // insert new data
    await User.insertMany(users);
    await Catagories.insertMany(catagories);
    await Product.insertMany(products);
    res.send("success");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
route.post("/delete", async (req, res) => {
  mongoose.connection.db.dropDatabase();
  res.send("dropped")
});
module.exports = route;

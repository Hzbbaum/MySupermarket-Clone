//#region imports
const mongoose = require("mongoose");
const route = require("express").Router();

//#endregion
//#region models
const User = require("../db/models/users");
const Product = require("../db/models/products");
//#endregion
//#region routes

route.post("/addProduct", async (req, res) => {
  try {
    Product.insertMany([req.body], (error, docs) => {
      if (error) res.send(error);
      else {
        Product.find({})
          .exec()
          .then(products => res.json(products));
      }
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

route.post("/edit/:productid", async (req, res) => {
    try {
        Product.findOneAndUpdate({_id:req.params.productid},req.body, (error, docs) => {
          if (error) res.send(error);
          else {
            Product.find({})
              .exec()
              .then(products => res.json(products));
          }
        });
      } catch (error) {
        console.log(error);
        res.send(error);
      }
    });
//#endregion
module.exports = route;

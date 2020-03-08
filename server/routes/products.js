//#region imports
const Product = require("../db/models/products");
const catagories = require("../db/models/catagories");
//#endregion

const route = require("express").Router();
//#region endpoints
// get products by category
route.get(``, (req, res) => {
  const requestedCategory = req.query.category;
  Product.find({category:{$ne:null}}, { _id: false, image_url: false })
    .populate({
      path: "category",
      match: { name: requestedCategory },
      select: "name -_id"
    })
    .exec()
    .then(products => res.json(products));
});
//#endregion

module.exports = route;

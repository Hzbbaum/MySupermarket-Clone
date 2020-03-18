//#region imports
const Product = require("../db/models/products");
//#endregion

const route = require("express").Router();
//#region endpoints
// get products by category
route.get(`/:category`, (req, res) => {
  const requestedCategory = req.params.category;
  const query =
    requestedCategory == "all" ? {} : { category: requestedCategory };
  Product.find(query)
    .exec()
    .then(products => res.json(products));
});

//#endregion

module.exports = route;

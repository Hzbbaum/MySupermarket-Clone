//#region imports
const route = require("express").Router();
const User = require("../db/models/users");
const Products = require("../db/models/products");
const ObjectId = require("mongoose").Types.ObjectId;
//#endregion

//#region endpoints
// add item to cart
route.post("/tocart", async (req, res) => {
  try {
    const { userId, itemId, amount } = req.body;
    const amountnumber = Number(amount);
    if (!userId || !itemId || !amountnumber) {
      res
        .status(404)
        .json({ error: "must send user ID, item _id, and amount to add." });
      throw Error("malformed data received");
    }
    /// make sure we have a token etc...
    let _user = await User.findOne({ ID: userId });
    if (!_user) {
      res.status(404).json({ error: "user not found" });
      throw Error("User from client does not exist");
    }
    if (amountnumber <= 0) {
      res.status(404).json({ error: "amount of item to add must be positive" });
      throw Error("non positive amount requested");
    }
    if (isObjectIdValid(itemId)) {
      let _product = await Products.findById(itemId);
      if (!_product) {
        res.status(404).json({ error: "product not found" });
        throw Error("Product from client does not exist");
      }
    } else {
      res.status(404).json({ error: "invalid item _id" });
    }
    let _product = await Products.findById(itemId);
    _user = await User.findOne({ ID: userId });

    let added = false;
    for (let i = 0; i < _user.cart.items.length; i++) {
      if (!added && _user.cart.items[i].product._id == itemId) {
        _user.cart.items[i].quantity =
          _user.cart.items[i].quantity + amountnumber;
        _user.cart.items[i].subtotal =
          _user.cart.items[i].quantity * _product.price;
        added = true;
      }
    }
    if (!added) {
      _user.cart.items.push({
        product: itemId,
        quantity: amountnumber,
        subtotal: amountnumber * _product.price
      });
    }
    _user.save().then(async () => {
      {
        _user = await User.findOne({ ID: userId }).populate({
          path: "cart.items.product",
          model: "product"
        });
        res.status(200).json(_user);
      }
    });
  } catch (error) {
    if (!error.name === "CastError") {
      console.log("cast error");
    } else console.log(error);
  }
});
// empty cart and make a new one
route.post("/newcart", async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      res.status(404).json({ error: "must send user ID" });
      throw Error("malformed data received");
    }
    /// make sure we have a token etc...
    let _user = await User.findOne({ ID: userId });
    if (!_user) {
      res.status(404).json({ error: "user not found" });
      throw Error("User from client does not exist");
    }
    _user = await User.findOne({ ID: userId });
    _user.cart.items = [];
    _user.cart.creationDate = new Date();
    _user.save().then(async () => {
      {
        _user = await User.findOne({ ID: userId }).populate({
          path: "cart.items.product",
          model: "product"
        });
        res.status(200).json(_user);
      }
    });
  } catch (error) {
    if (!error.name === "CastError") {
      console.log("cast error");
    } else console.log(error);
  }
});
/// delete item from cart by user id and item id
route.delete("/removeitem/:userID/:itemId", async (req, res) => {
  const recievedUserID = req.params.userID;
  const recievedItemId = req.params.itemId;
  if (!recievedItemId || !recievedUserID)
    res.status(404).send("userid or item id not recieved");
  // check if user matches session user
  else {
    let _user = await User.findOne({ ID: recievedUserID });
    let _cart = _user.cart.items;
    const matchIndex = _cart.findIndex(
      cartitem => cartitem.product == recievedItemId
    );
    _cart.splice(matchIndex, 1);
    _user.cart.items = _cart;
    _user.save().then(async () => {
      {
        _user = await User.findOne({ ID: recievedUserID }).populate({
          path: "cart.items.product",
          model: "product"
        });
        res.status(200).json(_user);
      }
    });
  }
});


//#endregion

module.exports = route;
function isObjectIdValid(id) {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

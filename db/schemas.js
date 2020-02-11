const mongoose = require("mongoose");

const schemas = {
  productSchema: new mongoose.Schema({
    id: ObjectId,
    name: String,
    price: Number,
    category: String,
    image_url: String
  }),

  categorySchema: new mongoose.Schema({
    id: ObjectId,
    name: String
  }),

  cartItemSchema: new mongoose.Schema({
    id: ObjectId,
    product_id: ObjectId,
    quantity: Number,
    subtotal: Number
  }),

  cartSchema: new mongoose.Schema({
    id: ObjectId,
    creationDate: Date,
    items: [cartItemSchema]
  }),

  orderSchema: new mongoose.Schema({
    id: ObjectId,
    cart: cartSchema,
    finalPrice: Number,
    requiredDeliveryDate: Date,
    orderPlacedDate: {type:Date, default: Date.now},
    final4CC: Number
  }),

  userSchema: new mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    id: Number,
    password: String,
    role: String,
    city: String,
    street: String,
    cart: cartSchema,
    orderHistory: [orderSchema]
  })
};
module.exports(schemas)
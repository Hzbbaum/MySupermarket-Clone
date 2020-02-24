const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: 
  {type:Number,
    required:true
  },
  category: {
    type:Schema.Types.ObjectId,
    ref:"catagories"
  },
  image_url: String
});
const cartItemSchema = {
  id: mongoose.ObjectId,
  product_id: String,
  quantity: Number,
  subtotal: Number
};
const categorySchema = {
  id: mongoose.ObjectId,
  name: String
};
const cartSchema = {
  id: mongoose.ObjectId,
  creationDate: Date,
  items: [cartItemSchema]
};
const orderSchema = {
  id: mongoose.ObjectId,
  cart: cartSchema,
  finalPrice: Number,
  requiredDeliveryDate: Date,
  orderPlacedDate: { type: Date, default: Date.now },
  final4CC: Number
};
const userSchema = {
  name: String,
  surname: String,
  email: String,
  id: mongoose.ObjectId,
  password: String,
  role: String,
  city: String,
  street: String,
  cart: cartSchema,
  orderHistory: [orderSchema]
};
const schemas = {
  productSchema,
  categorySchema,
  cartItemSchema,
  cartSchema,
  orderSchema,
  userSchema
};
module.exports = schemas;

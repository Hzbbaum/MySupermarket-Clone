const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emailRegexValidator = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const cartItemSchema = new mongoose.Schema({
  product_id: {
    type: Schema.Types.ObjectId,
    refs: "products",
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  subtotal: {
    type: Number,
    required: true
  },
  __v: { type: Number, select: false }
});

const cartSchema = new mongoose.Schema({
  creationDate: {
    type: Date,
    default: Date.now
  },
  items: {
    type: [cartItemSchema],
    required: true,
    default: []
  },
  __v: { type: Number, select: false }
});

const orderSchema = new mongoose.Schema({
  cart: {
    type: cartSchema,
    required: true
  },
  finalPrice: {
    type: Number,
    required: true,
    default: 0
  },
  requiredDeliveryDate: {
    type: Date,
    required: true
  },
  orderPlacedDate: {
    type: Date,
    default: Date.now
  },
  final4CC: {
    type: Number,
    required: true
  },
  __v: { type: Number, select: false }
});

const userSchema = new mongoose.Schema({
  ID: {
    type: Number,
    length: 9,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    match: [emailRegexValidator, "invalid email form"],
    required: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  },
  city: {
    type: String,
    required: function() {
      return !this.admin;
    }
  },
  street: {
    type: String,
    required: function() {
      return !this.admin;
    }
  },
  cart: {
    type: cartSchema,
    required: function() {
      return !this.admin;
    }
  },
  orderHistory: {
    type: [orderSchema],
    required: function() {
      return !this.admin;
    }
  },
  __v: { type: Number, select: false }
});
module.exports = users = mongoose.model("user", userSchema);

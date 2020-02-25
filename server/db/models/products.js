const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    unique:true
  },
  price:{
    type:Number,
    required:true
  },
  category: {
    type:String,
    required:true
  },
  image_url: {
    type:Number,
    required:true
  },
})

module.exports = products = mongoose.model("products", productSchema)
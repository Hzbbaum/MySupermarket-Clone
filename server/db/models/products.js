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
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"Catagories"
  },
  image_url: {
    type:String,
    required:true
  },
})

module.exports = products = mongoose.model("products", productSchema)
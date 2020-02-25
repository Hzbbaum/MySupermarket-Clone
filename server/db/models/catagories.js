const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    unique:true
  }
})

module.exports = catagories =  mongoose.model("catagories", categorySchema)
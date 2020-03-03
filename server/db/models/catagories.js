const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true, "no name was given for this category"],
    unique:[true, `${this.name} already exists as a category`]
  }
})

module.exports = catagories =  mongoose.model("catagories", categorySchema)
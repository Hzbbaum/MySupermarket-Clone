const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true
  },
  __v: { type: Number, select: false },
});
productSchema.virtual("categoryId",{
  ref:"Catagories",
  localField:'category',
  foreignField:"_Id",
  justOne:true
})

module.exports = products = mongoose.model("product", productSchema);

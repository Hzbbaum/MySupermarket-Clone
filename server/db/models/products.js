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
    required: true
  },
  image_url: {
    type: String,
    required: true
  }
});
productSchema.virtual(
  "categoryId",
  {
    ref: "Catagories",
    localField: "category",
    foreignField: "name",
    justOne: true
  },
  {
    toJSON: {
      transform: function(doc, ret) {
        delete ret._v;
      }
    },
    toObject: {
      transform: function(doc, ret) {
        delete ret._v;
      }
    }
  }
);

module.exports = products = mongoose.model("product", productSchema);

const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "no name was given for this category"],
      unique: [true, `${this.name} already exists as a category`]
    },
    __v: { type: Number, select: false }
  },
  {
    toJSON: {
      transform: function(doc, ret) {
        delete ret._v;
        delete ret._id;
      }
    },
    toObject: {
      transform: function(doc, ret) {
        delete ret._v;
        delete ret._id;
      }
    }
  }
);

module.exports = catagories = mongoose.model("catagories", categorySchema);

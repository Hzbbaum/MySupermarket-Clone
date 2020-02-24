const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
}),

const categorySchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    unique:true
  }
})

const cartItemSchema = new mongoose.Schema({
  product_id: {
    type:Schema.Types.ObjectId,
    refs:productSchema,
    required:true
  },
  quantity: {
    type:Number,
    required:true
  },
  subtotal: {
    type:Number,
    required:true
  }
})

const cartSchema= new mongoose.Schema({
  creationDate: {
    type:Date,
    default:Date.now
  },
  items:{
    type:[cartItemSchema],
    required:true,
    default:[]
  }
})

const orderSchema= new mongoose.Schema({
  cart: {
    type:cartSchema,
    required:true,
    default:[]
  },
  finalPrice: {
    type:Number,
    required:true,
    default:0
  },
  requiredDeliveryDate: {
    type:Date,
    required:true
  },
  orderPlacedDate: {
    type:Date,
    default: Date.now
  },
  final4CC: {
    type:Number,
    required:true
  }
})

const userSchema= new mongoose.Schema({
  name: {
    type:String,
    required:true
  },
  surname: {
    type:String,
    required:true
  },
  email: {
    type:String,
    required:true,
    unique:true
  },
  password: {
    type:String,
    required:true
  },
  admin: {
    type:Boolean,
    default:false
  },
  city: {
    type:String,
    required:true
  },
  street: {
    type:String,
    required:true
  },
  cart: {
    type:cartSchema,
    required:true,
  },
  orderHistory:{ 
    type:[orderSchema],
    required:true,
    default:[]
  }
})
module.exports = models = {
  catagories:mongoose.model("catagories", categorySchema),
  products:mongoose.model("products", productSchema),
  users:mongoose.model("users", userSchema)
}
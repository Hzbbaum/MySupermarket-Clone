import { model } from "mongoose";
import { categories as _categories, products as _products, users as _users } from "./schemas";
const startDb = ()=>{
    const categories = model("categories", _categories);
    const products = model("products", _products);
    const users = model("users", _users);
}
module.exports(startDb)
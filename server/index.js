//#region packages

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

//#endregion
//#region import routes

const users = require("./api/routes/users");
const products = require("./api/routes/products");
const oauth = require("./api/routes/oauth");

//#endregion
//#region db setup

//DB config
const db = require("./config/keys").mongoURI;
//Connect to DB
mongoose
  .connect(db)
  .then(() => console.log("Mongo Connected"))
  .catch(err => console.log(err));

//#endregion
//#region MidleWare

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//#endregion

//Use Routes
app.use("/api/users", users);
app.use("/api/products", products);
app.use("/api/oauth", oauth);

//Listen
app.listen(port, () => console.log(`Server running on port: ${port}`));

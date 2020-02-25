//#region packages

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

//#endregion
//#region import routes
const setup = require("./routes/setup");
const users = require("./routes/users");
const products = require("./routes/products");
const oauth = require("./routes/oauth");

//#endregion
//#region db setup

//DB config
const db = "mongodb://localhost/mysupermarket";
//Connect to DB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Mongo Connected");
  })
  .catch(err => console.log(err));
mongoose.set("useCreateIndex", true);

//#endregion
//#region MidleWare

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//#endregion

//Use Routes
app.use("/setup", setup);
app.use("/api/users", users);
app.use("/api/products", products);
app.use("/api/oauth", oauth);

//Listen
app.listen(port, () => console.log(`Server running on port: ${port}`));

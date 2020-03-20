//#region packages

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const port = process.env.PORT || 3000;
//#endregion
//#region import routes
const buildRoutes = require("./routes/buildroutes");
const users = require("./routes/users");
const products = require("./routes/products");
const oauth = require("./routes/oauth");
const catagories = require("./routes/catagories");
const admin = require("./routes/adminroutes");
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
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true")
  next();
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: "secret", resave: true, saveUninitialized: true }));
//#endregion

//Use Routes
app.use("/build", buildRoutes);
app.use("/api/users", validateUser, users);
app.use("/api/products", validateUserOrAdmin, products);
app.use("/api/oauth", oauth);
app.use("/api/catagories", validateUserOrAdmin, catagories);
app.use("/admin", validateAdmin, admin);

//Listen
app.listen(port, () => console.log(`Server running on port: ${port}`));

//#region validators

function validateAdmin(req, res, next) {
  console.log(req.session.user, req.session.isadmin);
  if (req.session.user && req.session.isadmin) next();
  else res.sendStatus(404);
}
function validateUser(req, res, next) {
  console.log(req.session.user, req.session.isadmin);
  if (req.session.user && !req.session.isadmin) next();
  else res.sendStatus(404);
}
function validateUserOrAdmin(req, res, next) {
  console.log(req.session.user, req.session.isadmin);
  if (req.session.user && !req.session.isadmin) next();
}

//#endregion

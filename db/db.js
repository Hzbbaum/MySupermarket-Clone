//#region constants
const startDb = require("./startDb");
const mongoose = require(mongoose);
mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true });

//#endregion

//#region connection

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", startDb());

//#endregion

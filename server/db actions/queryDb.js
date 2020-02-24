//#region constants
const mongoose = require("mongoose");

//#endregion

//#region connection
const queryDb = () => {
  mongoose.connect("mongodb://localhost/mysupermarket", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  return mongoose.connection.db.listCollections().toArray();
};
//#endregion
module.exports = queryDb;

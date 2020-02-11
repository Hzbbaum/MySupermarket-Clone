//#region imports
const express = require("express");
const cors = require("cors");

//#endregion

//#region setup
const app = express();
const port = dotenv.port || 3000;

//#endregion

//#region server middleware
app.use(express.json());
app.use(cors());
//#endregion

//#region routes
app.get("/", (req, res)=>{
    res.send("dave says hi")
})

app.listen(port, () => console.log(`listening on ${port}`));
//#endregion

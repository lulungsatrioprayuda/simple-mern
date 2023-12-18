//Load env variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//import dependencies
const express = require("express");
const connectToDb = require("./config/connectToDb");

//create an express app
const app = express();

//connect to database
connectToDb();

//Routing
app.get("/", (req, res) => {
  res.json({ hello: "world!" });
});

app.post("/notes", (req, res) => {
  //do something create data
});
//Start Our server
app.listen(process.env.PORT);

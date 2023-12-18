//Load env variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//import dependencies
const express = require("express");
const connectToDb = require("./config/connectToDb");
const Note = require("./models/note");

//create an express app
const app = express();

//configure express app
app.use(express.json());

//connect to database
connectToDb();

//Routing

app.get("/notes");

app.get("/notes/:id");

app.post("/notes");

app.put("/notes/:id");

app.delete("/notes/:id");

//Start Our server
app.listen(process.env.PORT);

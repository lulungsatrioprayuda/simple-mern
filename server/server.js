//Load env variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//import dependencies
const express = require("express");
const cors = require("cors");
const connectToDb = require("./config/connectToDb");
const noteController = require("./controllers/noteController");

//create an express app
const app = express();

//configure express app
app.use(express.json());
app.use(cors());

//connect to database
connectToDb();

//Routing

//Notes
app.get("/notes", noteController.fetchNotes);
app.get("/notes/:id", noteController.fetchNote);
app.post("/notes", noteController.createNote);
app.put("/notes/:id", noteController.updateNote);
app.delete("/notes/:id", noteController.deleteNote);

//Start Our server
app.listen(process.env.PORT);

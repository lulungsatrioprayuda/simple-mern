//Load env variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//import dependencies
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDb = require("./config/connectToDb");
const noteController = require("./controllers/noteController");
const userController = require("./controllers/userController");
const requireAuth = require("./middleware/requireAuth");

//create an express app
const app = express();

//configure express app
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

//connect to database
connectToDb();

//Routing

//auth
app.post("/signup", userController.signup);
app.post("/login", userController.login);
app.get("/logout", userController.logout);
app.get("/check-auth", requireAuth, userController.checkAuth);

//Notes
app.get("/notes", noteController.fetchNotes);
app.get("/notes/:id", noteController.fetchNote);
app.post("/notes", noteController.createNote);
app.put("/notes/:id", noteController.updateNote);
app.delete("/notes/:id", noteController.deleteNote);

//Start Our server
app.listen(process.env.PORT);

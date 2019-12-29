const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//mongo DB Configuration
const db = require("./setup/database").mongoURL;

//DB connection
mongoose
  .connect(db)
  .then(() => console.log("database connected"))
  .catch(err => console.log(err));

//using routes
const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);
//server static assets if in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server is running at port : ${port}`);
});

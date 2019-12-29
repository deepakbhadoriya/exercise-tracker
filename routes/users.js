const express = require("express");
const router = express.Router();

//importing user schema
let User = require("../models/user.model");

//router to get all user info
router.get("/", (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error:" + err));
});

// add new user
router.post("/add",(req, res) => {
  
  const username = req.body.username;
  const newUser = new User({username});

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch(err => res.status(400).json("Error:" + err));
});

module.exports = router;

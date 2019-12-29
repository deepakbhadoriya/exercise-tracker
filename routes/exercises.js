const express = require("express");
const router = express.Router();

//calling models
let Exercise = require("../models/exercise.model");

//router to get all the exercises
router.get("/", (req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json("Error:" + err));
});

//router to add new exercises
router.post("/add", (req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date
  });

  newExercise
    .save()
    .then(() => res.json("Exercise added!"))
    .catch(err => res.status(400).json("Error:" + err));
});

//router to get exercise by user id
router.get("/:id", (req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json("Error:" + err));
});

//router to delete exercise by user id
router.delete("/:id", (req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise Deleted Successfully"))
    .catch(err => res.status(400).json("Error:" + err));
});

//router to update exercise by user id
router.post("/update/:id", (req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise
        .save()
        .then(() => res.json("Excercise Updated!"))
        .catch(err => res.status(400).json("Error : " + err));
    })
    .catch(err => res.status(400).json("Error :" + err));
});
module.exports = router;

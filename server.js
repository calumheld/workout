const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT=process.env.PORT||3000;

const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", { useNewUrlParser: true });

app.get("/exercise", (req, res) => {
  db.Exercise.find({})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/workouts", (req, res) => {
    db.Workout.find({})
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json(err);
      });
  });

  app.post("/submit", ({ body }, res) => {
    db.Exercise.create(body)
      .then(({ _id }) => db.Workout.findOneAndUpdate({}, { $push: { exercise: _id } }, { new: true }))
      .then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => {
        res.json(err);
      });
  });

  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
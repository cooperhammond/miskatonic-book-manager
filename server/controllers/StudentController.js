const Student = require('../models/StudentModel');
const mongoose = require("mongoose");

exports.create = function (req, res) {
  var query = Student.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    grade: req.body.grade
  });

  query.then((student) => {
    res.status(200).send(student);
  });

  query.catch((err) => {
    return res.status(500).json(err);
  });
}

exports.readAll = function (_, res) {
  var query = Student.find({});

  query.then((students) => {
    res.status(200).send(students);
  });

  query.catch((err) => {
    return res.status(500).json(err);
  });
}

exports.readSingle = function (req, res) {
  var query = Student.findOne({ _id: req.params.id });

  query.then((student) => {
    if (student) {
      res.status(200).send(student);
    } else {
      res.status(404).send({
        message: "Student not found",
        id: req.params.id
      });
    }
  });

  query.catch((err) => {
    return res.status(500).json(err);
  });
}

exports.update = function (req, res) {
  var query = Student.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: req.body });

  query.then((student) => {
    if (student) {
      res.status(200).send(student);
    } else {
      res.status(404).send({
        message: "Student not found",
        id: req.params.id
      });
    }
  });

  query.catch((err) => {
    return res.status(500).json(err);
  });
}

exports.delete = function (req, res) {
  var query = Student.findOne({ _id: req.params.id });

  query.then(async (student) => {
    if (student) {
      await student.remove();
      res.status(200).send({
        message: "Student deleted"
      });
    } else {
      res.status(400).send({
        message: "Student not found"
      });
    }
  });

  query.catch((err) => {
    res.status(500).json(err)
  });
}